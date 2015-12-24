var day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25;

(function (day1) {
    day1.run = function (str) {
        var iCount = 0,
            first = null;
        str.split('').map(function (e, i) {
            iCount = (e == ')') ? iCount - 1 : iCount + 1;
            if (iCount < 0 && first === null) {
                first = i + 1;
            }
        });

        return ["floor: " + iCount, "position: " + first];
    }
})(day1 || (day1 = {}));

(function (day2) {
    day2.present = function (length, width, height) {
        return 2*length*width + 2*width*height + 2*height*length;
    }

    day2.extra = function(length, width, height) {
        return Math.min(length*width, width*height, height*length);
    }

    day2.ribbon = function(length, width, height) {
        var arr = [length, width, height].sort(function(a, b) {return a - b;});
        return (arr[0]*2 + arr[1]*2) + (length * width * height);
    }

    day2.run = function(input) {
        var totalLength = 0;
        var totalRibbon = 0;
        var presents = input.split(String.fromCharCode(10));
        for (var i = presents.length - 1; i >= 0; i--) {
            var sizes = presents[i].split('x');
            totalLength += day2.present(sizes[0],sizes[1],sizes[2]);
            totalLength += day2.extra(sizes[0],sizes[1],sizes[2]);
            totalRibbon += day2.ribbon(sizes[0],sizes[1],sizes[2]);
        };

        return ["total length: " + totalLength, "total ribbon: " + totalRibbon];
    }

})(day2 || (day2 = {}));

(function (day) {
    var matrice;
    var count;
    var x;
    var y;

    function matricePush(iX, iY, value) {
        if(matrice[iX] === undefined) {
            matrice[iX] = {};
        }

        matrice[iX][iY] = value;      
    }

    function matriceIsSet(iX, iY) {
        if(matrice[iX] !== undefined) {
            if(matrice[iX][iY] !== undefined) {
                return true;
            }
        }
        return false;
    }

    function init() {
        matrice = {0:{0:1}};
        count = 1;    
        x = 0;
        y = 0; 
    }

    function move(direction) {

        switch(direction) {
            case '^': y--; break;
            case 'v': y++; break;
            case '>': x++; break;
            case '<': x--; break;
        }

        if(matriceIsSet(x, y)) {
            matrice[x][y]++;
        } else {
            matricePush(x, y, 1);
            count++;         
        }
        console.log("count: "+count+" , [" + x + "," + y + "] : " + matrice[x][y]);

    }

    day.run = function(input) {

        init();       

        console.log(input);

        input.split('').map(function (e, i) {
            move(e);
        });

        var result = ["number of houses (year 1): " + count];

        init();

        input.split('').map(function (e, i) {
            if(i%2 == 0)
                move(e);
        });

        x = 0;
        y = 0;         

        input.split('').map(function (e, i) {
            if(i%2 != 0)
                move(e);
        });         

        result.push("number of houses (year 2): " + count);

        return result;
    }
})(day3 || (day3 = {}));

(function (day) {
    day.bruteforce = function(start, pattern) {

        var count = 0;
        var str;

        while(true) {
            str = md5(start + count);
            if(str.indexOf(pattern) === 0) {
                return count;
            }

            count++;
        }
 
    }

    day.run = function(input) {

        var number1 = day.bruteforce(input, '00000');
        var number2 = day.bruteforce(input, '000000');

        return ["lowest key (5 zero): " + number1, "lowest key (6 zero): " + number2];        
    }
})(day4 || (day4 = {}));

(function (day) {

    day.hasThreeVowels = function(str) {
        var regex = str.match(/[aeiou]/gi);
        return (regex !== null && regex.length > 2);
    }

    day.hasDoubleLetter = function(str) {
        for (var i = 97; i <= 122; i++) {
            if(str.indexOf(String.fromCharCode(i, i)) !== -1) {
                return true;
            }
        }
        return false;
    }

    day.hasNoForbidenString = function(str) {
        return (str.search(/ab|cd|pq|xy/i) === -1);
    }

    day.run = function(input) {
        var count = 0;
        var names = input.split(String.fromCharCode(10));

        for (var i = names.length - 1; i >= 0; i--) {
            if(day.hasThreeVowels(names[i]) && day.hasDoubleLetter(names[i]) && day.hasNoForbidenString(names[i])) {
                count++;
            }

        };

        return ["nice strings: " + count];      
    }
})(day5 || (day5 = {}));