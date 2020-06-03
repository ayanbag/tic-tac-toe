let ai = {
    findAvailableMoves(board) {
        const availableMoves = []
        for (let space in board) {
            if (!board[space]) {
                availableMoves.push(space)
            }
        }
        return availableMoves
    },

    getState(board, target) {
        const winConditions = [
            ['topL', 'topM', 'topR'],
            ['midL', 'midM', 'midR'],
            ['botL', 'botM', 'botR'],
            ['topL', 'midM', 'botR'],
            ['topR', 'midM', 'botL'],
            ['topL', 'midL', 'botL'],
            ['topM', 'midM', 'botM'],
            ['topR', 'midR', 'botR']
        ]
        const boardIsFull = !this.findAvailableMoves(board).length
        if (boardIsFull) {
            for (let i = 0; i < winConditions.length; i++) {
                let [a, b, c] = winConditions[i]
                let won =
                    board[a] === target &&
                    board[b] === target &&
                    board[c] === target
                if (won) {
                    return 10
                }
            }
            return 5
        } else {
            for (let i = 0; i < winConditions.length; i++) {
                let [a, b, c] = winConditions[i]
                let won =
                    board[a] === target &&
                    board[b] === target &&
                    board[c] === target
                if (won) {
                    return 10
                }
            }
        }

        for (let i = 0; i < winConditions.length; i++) {
            let [a, b, c] = winConditions[i]
            let won =
                board[a] === target &&
                board[b] === target &&
                board[c] === target
            if (won) {
                return 10
            }
        }
        return
    },

    minimax(board, moves, max, depth = -1) {
        let target
        let results = []
        if (max) {
            // max's turn
            target = 'o'
            for (const move of moves) {
                const newBoard = { ...board, [move]: target }
                let result = this.getState(newBoard, target)
                if (result === 10) {
                    // max (player) just found out a winning situation
                    results.push(10)
                    break
                } else if (result === 5) {
                    // So there's no point in doing any more calculations
                    results.push(5)
                } else {
                    const minimaxResults = Math.min(
                        ...this.minimax(
                            newBoard,
                            this.findAvailableMoves(newBoard),
                            false
                        )
                    )
                    results.push(minimaxResults)
                }
            }
        } else {
            // min's turn
            target = 'x'
            for (const move of moves) {
                const newBoard = { ...board, [move]: target }
                let result = this.getState(newBoard, target)
                if (result === 10) {
                    results.push(0)
                    break
                } else if (result === 5) {
                    results.push(5)
                } else {
                    const minmaxResults = Math.max(
                        ...this.minimax(
                            newBoard,
                            this.findAvailableMoves(newBoard),
                            true
                        )
                    )
                    results.push(minmaxResults)
                }
            }
        }
        return results
    }
}

export default ai

