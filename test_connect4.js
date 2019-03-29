it("should return correct row given column", function () {
    let board = [[null, null, null], [null, null, null], [null, 1, null]];
    expect(findSpotForCol(board, 1, 3)).toEqual(1);
})

it("should be filled", function () {
    let board = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
    expect(checkBoardIsFilled(board)).toEqual(true);
})

