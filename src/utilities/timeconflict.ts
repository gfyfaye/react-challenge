
// dictionary containing occupied times of each day of the week
// 1 represents monday, 2 represents tuesday, etc.
export const occupied: { [key: number]: [number, number][] } = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: []
};


//input: meets string of a course (format example: "MWF 10:00-10:50")
export function parseDays(days: string) {
    
    let c = 0;
    let retlist = [];

    while ((c < days.length)) {

        if (days[c] === "M"){
            retlist.push(1);
            c++;
        }
        else if (days[c] === "W"){
            retlist.push(3);
            c++;
        }
        else if (days[c] === "F"){
            retlist.push(5);
            c++;
        }

        else if (days[c] === "T"){
            c++;
            if (days[c] == "u") {
                retlist.push(2);
                c++;
            }
            else if (days[c] == "h") {
                retlist.push(4);
                c++;
            }
            else {
                c++;
            }
        }
        else {
            c++;
        }
    }
    return retlist;
}


// input: a string representing the time of the class
// output: a tuple of integers representing the times in minutes since midnight 

// example: "10:00 - 10:50"  = [600, 650]
// [10*60, 10*60+50]
export function parseHours(hours: string) {

    const [start, end] = hours.split("-");
    const [starthour, startmin] = start.split(":")
    const [endhour, endmin] = end.split(":")

    const parsedstart = parseInt(starthour)*60 + parseInt(startmin);
    const parsedend = parseInt(endhour)*60 + parseInt(endmin);

    return [parsedstart, parsedend] as [number, number];
}


// returns if two minute-ranges overlap
export function hasOverlap([start1, end1] : [number, number], [start2, end2] : [number, number]) {
  return start1 < end2 && start2 < end1;
}

//input: course clicked to be checked for conflicts
//output: boolean indicating if the course conflicts with any already selected courses

export function hasConflict(course: { meets: string }) {
    const [days, hours] = course.meets.split(" ");

    //convert days into a list of ints instead of a single string
    //1 - Mon, 2 - Tues ....
    //e.g. MWF = [1, 3, 5]
    const parsedDays = parseDays(days);
    const parsedHours = parseHours(hours);
    
    for (const d of parsedDays) {
        for (const current of occupied[d]) {
            if (hasOverlap(parsedHours, current)) {
                return true;
            }
        }
    }


    //no conflict! 
    return false;
}