// my_xword.ts
// https://code.visualstudio.com/docs/typescript/typescript-compiling


export type Word = {
	answer: string
	hint: string
	startx?: number
	starty?: number
  // 0 = vertical, 1 = horizontal
	orientation?: number,
	position?: number
}

export type Crossword = string[][];


// data used for testing
let a: Word = {answer: "ELEPHANT", hint: "elephant"};
let b: Word = {answer: "FAST", hint: "fast"};
let c: Word = {answer: "TABLES", hint: "tables"};
let d: Word = {answer: "QUICK", hint: "quick"};
let e: Word = {answer: "EAT", hint: "eat"};
let f: Word = {answer: "DOG", hint: "dog"};
let g: Word = {answer: "SMILE", hint: "smile"};
let h: Word = {answer: "BUDDY", hint: "buddy"};
const x_data: Word[] = [
  a,b,c,d,e,f,g,h,
	// {answer: "hey", hint: "hey"} as Word // option to define list
];

export function createCrossword(SIZE: number, xword_data: Word[]): {words: Word[], crossword: Crossword} {
	var words_used: Word[] = [];

	function initiateBlank(n: number): Crossword {
		const output: Crossword = Array.from({length: n}, () => Array(10).fill("~"));
		return output;
	}
	
	
	function print_crossword(current: Crossword, entry?: string): void {
		for (let row of current) {
			let crosswordToPrint = "[";
			for (let item of row) {
				crosswordToPrint = crosswordToPrint.concat(`${item}, `);
			}
			crosswordToPrint = crosswordToPrint.concat("]");
			console.log(crosswordToPrint, entry);
		}
	
	}
	
	
	function canPlace(current: Crossword, word: Word): boolean {
		let word_len = word.answer.length;
		var spot_to_check: string;
		if (word.startx != undefined && word.starty != undefined) {
			if (word.orientation === 0) {
				if ((word_len + word.startx) > SIZE) {
					return false
				}
				for (let i = 0; i < word_len; i++) {
					spot_to_check = current[word.startx + i][word.starty];
					if (spot_to_check != "~" && spot_to_check != word.answer[i]) {
						return false;
					}
				}
				return true;
			} else if (word.orientation === 1) {
				if ((word_len + word.starty) > SIZE) {
					return false;
				}
				for (let i = 0; i < word_len; i++) {
					spot_to_check = current[word.startx][word.starty + i];
					if (spot_to_check != "~" && spot_to_check != word.answer[i]) {
						return false;
					}
				}
				return true;
			} else {
				console.warn(`Direction: ${word.orientation} didn't work in canPlace()`);
				return false;
			}
		}
		console.log("GOT UNDEFINED starting positions")
		return false
	}
	
	
	function maxRowCol(current: Crossword): number[] {
		let rows: number[] = [];
		let cols: number[] = [];
		for (let row=0; row<current.length; row++) {
			for (let col=0; col<=row;col++) {
				if (current[row][col] === "#") {
					rows.push(row);
					cols.push(col);
				}
			}
		}
		const maxRow: number = Math.max(...rows);
		const maxCol: number = Math.max(...cols);
			return [maxRow, maxCol]
	}
	
	
	function scoredBoard(current: Crossword): number {
		
		const rows = maxRowCol(current)[0];
		const cols = maxRowCol(current)[1];
		
		let sizeRatio: number;
		if (rows > cols) {
			sizeRatio = cols / rows;
		} else {
			sizeRatio = rows / cols
		}
		
		let filled = 0;
		let empty = 0;
		
		for (let row=0; row<=rows;row++) {
			for (let col=0; col<=cols;col++) {
				if (current[row][col] == "~") {
					empty += 1;
				} else {
					filled += 1
				}
			}
		}
		const filledRatio: number = filled/empty;
	
		const score: number = (10 * sizeRatio) + (20 * filledRatio);
		
		return score
	}
	
	
	function addToCrossword(current: Crossword, word: Word): Crossword {
		if (word.startx != undefined && word.starty != undefined) {
			if (word.orientation === 0){
				for (let i=0; i < word.answer.length; i++) {
					current[word.startx + i][word.starty] = word.answer[i];
				}
				if (word.startx + word.answer.length !== SIZE) {
					current[word.startx + word.answer.length][word.starty] = "#";
				} 
			} else if (word.orientation === 1) {
				for (let i=0; i < word.answer.length; i++) {
					current[word.startx][word.starty + i] = word.answer[i];
				}
				if (word.starty + word.answer.length !== SIZE) {
					current[word.startx][word.starty + word.answer.length] = "#";
				} 
			} else {
				console.warn(`Direction: ${word.orientation} didn't work in addToCrossword() :(`);
			}
		} else {
			console.log('fk', word)
		}
		return current;
	}
	
	
	function shuffle(array: Word[]): Word[] {
		let currentIndex = array.length;
	
		// While there remain elements to shuffle...
		while (currentIndex != 0) {
	
		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
	
		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}
		return array;
	}
	
	
	function pythonPop(list: Word[]): {item: Word, new_list: Word[]} {
	
		const item = list[0];
		const new_list = list.slice(1);
	
		return { item, new_list }
	
	}
	
	
	function multiBoardGen(words: Word[], maxWords: number): Crossword {
		let result: Crossword = initiateBlank(SIZE);
		let shuffled: Word[] = shuffle(words);
		var word = pythonPop(shuffled).item;
		var remaining = pythonPop(shuffled).new_list;
	
		word.startx = 0;
		word.starty = 0;
		word.orientation = 1;
		words_used.push(word);
		
		let i: number = 1
		let placements: (string|number)[][] = [];
		let bestScore: number = 0;
		let bestBoard: Crossword = addToCrossword(result, word);
		// while (i < maxWords && shuffled.length > 0) {
		while(remaining.length > 0) {
			word = pythonPop(remaining).item;
			remaining = pythonPop(remaining).new_list;
			placements = [];
			let new_orientation: number = i % 2===0 ? 1 : 0;
	
			for (let letter = 0; letter < word.answer.length; letter++) {
				for (let row=0; row<SIZE;row++) {
					for (let col=0; col<SIZE;col++) {
						if (bestBoard[row][col] === word.answer[letter]) {
							placements.push([word.answer, word.hint, row, col, new_orientation]);
						}
					}
				}
			}
			
			for (let placement of placements) {
				let new_word: Word = {
					answer: placement[0] as string, 
					hint: placement[1] as string, 
					startx: placement[2] as number, 
					starty: placement[3] as number, 
					orientation: placement[4] as number
				};
				if (canPlace(bestBoard, new_word)) {
					let newBoard: Crossword = addToCrossword(bestBoard, new_word);
					let newScore: number = scoredBoard(newBoard);
					
					if (newScore > bestScore) {
						bestScore = newScore;
						bestBoard = newBoard;
						words_used.push(new_word);
	
						break;
					}
				} else {
					continue;
				}
			}
			
			if (bestScore > 0) {
				result = bestBoard;
				i += 1;
			}
		}
		
		return result 
	}
	
	
	function getSubset(current: Crossword, 
						row_start: number, 
						row_end: number,
						col_start: number,
						col_end: number): Crossword {
			let output = current.slice(row_start, row_end + 1).map(i => i.slice(col_start, col_end + 1));
			return output;
	}
	
	function trimCrossword(current: Crossword): Crossword {
		let maxRow: number = maxRowCol(current)[0];
		let maxCol: number = maxRowCol(current)[1];
		const output: Crossword = getSubset(current, 0, maxRow, 0, maxCol);
		return output;
	}
	
	let working_board: Crossword = [];

	while (words_used.length <= 2) {
		words_used = [];
		working_board = multiBoardGen(xword_data, xword_data.length);
	}

	let acrossCount = 1;
  let downCount = 1;

  // get words in separate lists
  // 
  for (let i=0; i<words_used.length; i++) {
    if (words_used[i].orientation === 0) { // vertical
      words_used[i].position = downCount;
      downCount++;
    } else { // horizontal
      words_used[i].position = acrossCount;
      acrossCount++;
    }
  }

	// console.log(print_crossword(trimCrossword(working_board)));
	// console.log('words used', words_used);
	// return trimCrossword(working_board);
	return {
		words: words_used, 
		crossword: trimCrossword(working_board)
	};
}

// createCrossword(10, x_data);