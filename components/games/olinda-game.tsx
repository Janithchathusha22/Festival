"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Hole {
  id: number
  seeds: number
}

const OlindaGame = () => {
  const [board, setBoard] = useState<Hole[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1)
  const [selectedHole, setSelectedHole] = useState<number | null>(null)
  const [gameStatus, setGameStatus] = useState<string>("")
  const [showRules, setShowRules] = useState<boolean>(false)
  const [scores, setScores] = useState({ player1: 0, player2: 0 })
  const [gameOver, setGameOver] = useState<boolean>(false)

  // Initialize the board
  useEffect(() => {
    initializeBoard()
  }, [])

  const initializeBoard = () => {
    // Create a board with 14 holes (6 for each player + 2 stores)
    const newBoard: Hole[] = []

    // Player 1's holes (0-5)
    for (let i = 0; i < 6; i++) {
      newBoard.push({ id: i, seeds: 4 })
    }

    // Player 1's store (6)
    newBoard.push({ id: 6, seeds: 0 })

    // Player 2's holes (7-12)
    for (let i = 7; i < 13; i++) {
      newBoard.push({ id: i, seeds: 4 })
    }

    // Player 2's store (13)
    newBoard.push({ id: 13, seeds: 0 })

    setBoard(newBoard)
    setCurrentPlayer(1)
    setGameStatus("Player 1's turn")
    setScores({ player1: 0, player2: 0 })
    setGameOver(false)
  }

  const isPlayerStore = (holeId: number, player: 1 | 2) => {
    return (player === 1 && holeId === 6) || (player === 2 && holeId === 13)
  }

  const isPlayerHole = (holeId: number, player: 1 | 2) => {
    return (player === 1 && holeId >= 0 && holeId < 6) || (player === 2 && holeId >= 7 && holeId < 13)
  }

  const getOppositeHole = (holeId: number) => {
    if (holeId >= 0 && holeId < 6) {
      return 12 - holeId
    } else if (holeId >= 7 && holeId < 13) {
      return 12 - holeId
    }
    return -1 // Invalid for stores
  }

  const makeMove = (holeId: number) => {
    if (gameOver) return

    // Check if the selected hole belongs to the current player
    if (!isPlayerHole(holeId, currentPlayer)) {
      setGameStatus(`That's not your hole! Player ${currentPlayer}'s turn.`)
      return
    }

    // Check if the selected hole has seeds
    if (board[holeId].seeds === 0) {
      setGameStatus("You can't select an empty hole!")
      return
    }

    // Get seeds from the selected hole
    let seedsToSow = board[holeId].seeds
    const newBoard = [...board]
    newBoard[holeId].seeds = 0

    let lastSownHoleId = holeId

    // Sow the seeds
    for (let i = 1; i <= seedsToSow; i++) {
      lastSownHoleId = (holeId + i) % 14

      // Skip opponent's store
      if ((currentPlayer === 1 && lastSownHoleId === 13) || (currentPlayer === 2 && lastSownHoleId === 6)) {
        seedsToSow++
        continue
      }

      newBoard[lastSownHoleId].seeds++
    }

    // Check if the last seed was sown in the player's store
    const extraTurn = isPlayerStore(lastSownHoleId, currentPlayer)

    // Check if the last seed was sown in an empty hole on the player's side
    if (isPlayerHole(lastSownHoleId, currentPlayer) && newBoard[lastSownHoleId].seeds === 1) {
      const oppositeHoleId = getOppositeHole(lastSownHoleId)
      if (oppositeHoleId !== -1 && newBoard[oppositeHoleId].seeds > 0) {
        // Capture opponent's seeds
        const playerStoreId = currentPlayer === 1 ? 6 : 13
        newBoard[playerStoreId].seeds += newBoard[oppositeHoleId].seeds + 1
        newBoard[oppositeHoleId].seeds = 0
        newBoard[lastSownHoleId].seeds = 0
      }
    }

    // Update scores
    const newScores = {
      player1: newBoard[6].seeds,
      player2: newBoard[13].seeds,
    }

    // Check if game is over (all holes of a player are empty)
    const player1HolesEmpty = newBoard.slice(0, 6).every((hole) => hole.seeds === 0)
    const player2HolesEmpty = newBoard.slice(7, 13).every((hole) => hole.seeds === 0)

    if (player1HolesEmpty || player2HolesEmpty) {
      // Collect remaining seeds
      if (player1HolesEmpty) {
        for (let i = 7; i < 13; i++) {
          newBoard[13].seeds += newBoard[i].seeds
          newBoard[i].seeds = 0
        }
      } else {
        for (let i = 0; i < 6; i++) {
          newBoard[6].seeds += newBoard[i].seeds
          newBoard[i].seeds = 0
        }
      }

      // Update final scores
      newScores.player1 = newBoard[6].seeds
      newScores.player2 = newBoard[13].seeds

      // Determine winner
      let winner = ""
      if (newScores.player1 > newScores.player2) {
        winner = "Player 1 wins!"
      } else if (newScores.player2 > newScores.player1) {
        winner = "Player 2 wins!"
      } else {
        winner = "It's a tie!"
      }

      setGameStatus(`Game over! ${winner}`)
      setGameOver(true)
    } else {
      // Switch player if no extra turn
      if (!extraTurn) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
        setGameStatus(`Player ${currentPlayer === 1 ? 2 : 1}'s turn`)
      } else {
        setGameStatus(`Extra turn for Player ${currentPlayer}!`)
      }
    }

    setBoard(newBoard)
    setScores(newScores)
  }

  return (
    <div className="flex flex-col items-center">
      {showRules ? (
        <div className="mb-8 w-full max-w-3xl">
          <Alert className="bg-amber-100 border-amber-300">
            <AlertCircle className="h-4 w-4 text-amber-800" />
            <AlertTitle className="text-amber-800">How to Play Olinda Keliya</AlertTitle>
            <AlertDescription className="text-gray-700">
              <ol className="list-decimal pl-5 space-y-2 mt-2">
                <li>
                  The game is played on a board with 14 holes: 6 small holes for each player and 2 stores (one at each
                  end).
                </li>
                <li>Each small hole starts with 4 seeds.</li>
                <li>
                  Players take turns selecting one of their holes and sowing the seeds counterclockwise, one in each
                  hole.
                </li>
                <li>Skip your opponent's store when sowing.</li>
                <li>If your last seed lands in your store, you get an extra turn.</li>
                <li>
                  If your last seed lands in an empty hole on your side, you capture that seed and all seeds in the
                  opposite hole.
                </li>
                <li>The game ends when all six holes on one side are empty.</li>
                <li>The player with the most seeds in their store wins.</li>
              </ol>
            </AlertDescription>
          </Alert>
          <Button onClick={() => setShowRules(false)} className="mt-4 bg-amber-600 hover:bg-amber-700">
            Hide Rules
          </Button>
        </div>
      ) : (
        <Button onClick={() => setShowRules(true)} className="mb-8 bg-amber-600 hover:bg-amber-700">
          Show Rules
        </Button>
      )}

      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-amber-800">{gameStatus}</h3>
        <div className="flex justify-center gap-8 mt-2">
          <div className={`px-4 py-2 rounded-md ${currentPlayer === 1 ? "bg-amber-200 font-bold" : "bg-amber-50"}`}>
            Player 1: {scores.player1}
          </div>
          <div className={`px-4 py-2 rounded-md ${currentPlayer === 2 ? "bg-amber-200 font-bold" : "bg-amber-50"}`}>
            Player 2: {scores.player2}
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-3xl bg-amber-100 rounded-xl p-6 shadow-md">
        {/* Player 2's store */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-48 bg-amber-200 rounded-lg flex items-center justify-center shadow-inner">
          <div className="text-xl font-bold text-amber-800">{board[13]?.seeds || 0}</div>
        </div>

        {/* Player 1's store */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-48 bg-amber-200 rounded-lg flex items-center justify-center shadow-inner">
          <div className="text-xl font-bold text-amber-800">{board[6]?.seeds || 0}</div>
        </div>

        <div className="flex flex-col items-center py-4 px-20">
          {/* Player 2's holes */}
          <div className="flex justify-center gap-4 mb-8">
            {board
              .slice(7, 13)
              .reverse()
              .map((hole) => (
                <Button
                  key={hole.id}
                  onClick={() => makeMove(hole.id)}
                  disabled={currentPlayer !== 2 || gameOver}
                  className={`w-16 h-16 rounded-full ${
                    currentPlayer === 2 ? "bg-amber-300 hover:bg-amber-400" : "bg-amber-100"
                  } shadow-inner flex items-center justify-center text-lg font-bold text-amber-800`}
                >
                  {hole.seeds}
                </Button>
              ))}
          </div>

          {/* Player 1's holes */}
          <div className="flex justify-center gap-4">
            {board.slice(0, 6).map((hole) => (
              <Button
                key={hole.id}
                onClick={() => makeMove(hole.id)}
                disabled={currentPlayer !== 1 || gameOver}
                className={`w-16 h-16 rounded-full ${
                  currentPlayer === 1 ? "bg-amber-300 hover:bg-amber-400" : "bg-amber-100"
                } shadow-inner flex items-center justify-center text-lg font-bold text-amber-800`}
              >
                {hole.seeds}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Button onClick={initializeBoard} className="bg-amber-600 hover:bg-amber-700">
          Restart Game
        </Button>
      </div>
    </div>
  )
}

export default OlindaGame
