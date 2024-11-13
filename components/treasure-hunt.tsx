'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Anchor, Compass, Map, Skull, Swords } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

const itemList = [
    "Something red",
    "Something that starts with 'A'",
    "Something round",
    "Something with more than one color",
    "An object you use every day",
    "A book or magazine",
    "An object that reminds you of nature",
    "Something that shines",
    "A wooden object",
    "Something with a known brand logo",
    "A fashion accessory",
    "An object with a written message or quote",
    "Something green",
    "An object that was a gift from someone",
    "Something made of plastic",
    "A technology-related object",
    "Something used in the kitchen",
    "Something used in the bathroom",
    "Something that makes noise",
    "An object with numbers on it",
    "Something soft to touch",
    "An object that opens and closes",
    "Something yellow",
    "An object with a pattern",
    "Something that holds water",
    "An object used for writing",
    "Something that smells good",
    "An object with buttons",
    "Something square shaped",
    "An object from another country",
    "Something metallic",
    "An object used for cleaning",
    "Something transparent",
    "An object that tells time",
    "Something that folds",
    "An object with wheels",
    "Something that reflects light",
    "An object used for entertainment"
]

const pirateIcons = [Anchor, Compass, Map, Skull, Swords]

export function TreasureHunt() {
    const [participants, setParticipants] = useState<string[]>([])
    const [newParticipant, setNewParticipant] = useState('')
    const [gameStarted, setGameStarted] = useState(false)
    const [currentRound, setCurrentRound] = useState(0)
    const [scores, setScores] = useState<{ [key: string]: number }>({})
    const [roundOrder, setRoundOrder] = useState<string[]>([])
    const [gameEnded, setGameEnded] = useState(false)
    const [roundComplete, setRoundComplete] = useState(false)
    const [shuffledItems, setShuffledItems] = useState<string[]>([])

    const addParticipant = () => {
        if (newParticipant && !participants.includes(newParticipant)) {
            setParticipants([...participants, newParticipant])
            setNewParticipant('')
        }
    }

    const startGame = () => {
        const shuffled = [...itemList].sort(() => Math.random() - 0.5)
        setShuffledItems(shuffled)
        setGameStarted(true)
        setScores(participants.reduce((acc, participant) => ({ ...acc, [participant]: 0 }), {}))
    }

    const markParticipant = (participant: string) => {
        if (!roundOrder.includes(participant)) {
            const newOrder = [...roundOrder, participant]
            setRoundOrder(newOrder)

            const points = (participants.length - newOrder.length + 1) * 10
            setScores(prevScores => ({ ...prevScores, [participant]: prevScores[participant] + points }))

            if (newOrder.length === participants.length) {
                setRoundComplete(true)
            }
        }
    }

    const nextRound = () => {
        setCurrentRound(currentRound + 1)
        setRoundOrder([])
        setRoundComplete(false)
    }

    const endGame = () => {
        setGameEnded(true)
    }

    const resetGame = () => {
        setParticipants([])
        setGameStarted(false)
        setCurrentRound(0)
        setScores({})
        setRoundOrder([])
        setGameEnded(false)
    }

    return (
        <div className="container mx-auto p-4 min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: 'url("/images/background.jpg")' }}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <h1 className="text-4xl font-bold mb-8 text-center text-yellow-700">Pirate's Treasure Hunt</h1>

                {!gameStarted && (
                    <Card className="mb-8 bg-yellow-50 border-2 border-yellow-600">
                        <CardHeader>
                            <CardTitle className="text-2xl text-yellow-800">Gather Yer Crew!</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center mb-4">
                                <Input
                                    type="text"
                                    value={newParticipant}
                                    onChange={(e) => setNewParticipant(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addParticipant()
                                        }
                                    }}
                                    placeholder="Scallywag's name"
                                    className="mr-2 border-yellow-600"
                                />
                                <Button onClick={addParticipant} className="bg-yellow-600 hover:bg-yellow-700">
                                    Add to Crew
                                </Button>
                            </div>

                            <ul className="mt-4 space-y-2">
                                {participants.map((participant, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="flex items-center text-yellow-800"
                                    >
                                        {React.createElement(pirateIcons[index % pirateIcons.length], { className: "mr-2 h-5 w-5" })}
                                        {participant}
                                    </motion.li>
                                ))}
                            </ul>

                            {participants.length > 1 && (
                                <Button onClick={startGame} className="mt-6 bg-green-600 hover:bg-green-700">
                                    Set Sail!
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {gameStarted && !gameEnded && (
                    <Card className="mb-8 bg-yellow-50 border-2 border-yellow-600">
                        <CardHeader>
                            <CardTitle className="text-2xl text-yellow-800">Round {currentRound + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold mb-4 text-yellow-800">
                                Treasure to find: {shuffledItems[currentRound]}
                            </p>
                            {!roundComplete && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {participants.map((participant) => (
                                        <Button
                                            key={participant}
                                            onClick={() => markParticipant(participant)}
                                            disabled={roundOrder.includes(participant)}
                                            className={`bg-blue-500 hover:bg-blue-600 transition-all duration-300 ${roundOrder.includes(participant) ? 'opacity-50' : 'transform hover:scale-105'
                                                }`}
                                        >
                                            {participant}
                                        </Button>
                                    ))}
                                </div>
                            )}
                            {roundComplete && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 className="text-lg font-semibold mb-4 text-yellow-800">Current Booty:</h3>
                                    <ol className="mb-4 space-y-2">
                                        {Object.entries(scores)
                                            .sort(([, a], [, b]) => b - a)
                                            .map(([participant, score], index) => (
                                                <motion.li
                                                    key={participant}
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    className="flex items-center text-yellow-800"
                                                >
                                                    <Skull className="mr-2 h-5 w-5" />
                                                    {index + 1}. <span className="font-bold">{participant}</span>: {score} doubloons
                                                </motion.li>
                                            ))
                                        }
                                    </ol>
                                    <Button onClick={nextRound} className="mt-4 bg-green-600 hover:bg-green-700">
                                        Next Voyage
                                    </Button>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {gameStarted && !gameEnded && currentRound < itemList.length && (
                    <Button onClick={endGame} className="bg-red-600 hover:bg-red-700">End the Hunt</Button>
                )}

                {gameEnded && (
                    <Card className="bg-yellow-50 border-2 border-yellow-600">
                        <CardHeader>
                            <CardTitle className="text-2xl text-yellow-800">Final Treasure Count</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="space-y-2">
                                {Object.entries(scores)
                                    .sort(([, a], [, b]) => b - a)
                                    .map(([participant, score], index) => (
                                        <motion.li
                                            key={participant}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="flex items-center text-yellow-800"
                                        >
                                            {React.createElement(pirateIcons[index % pirateIcons.length], { className: "mr-2 h-5 w-5" })}
                                            {index + 1}. <span className="font-bold">{participant}</span>: {score} doubloons
                                        </motion.li>
                                    ))
                                }
                            </ol>
                            <Button onClick={resetGame} className="mt-6 bg-green-600 hover:bg-green-700">
                                Start a New Adventure
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </motion.div>
            <Image
                src="/images/treasure.png"
                alt="Treasure Chest"
                width={80}
                height={80}
                className="absolute top-4 left-4 animate-pulse"
            />
        </div>
    )
}