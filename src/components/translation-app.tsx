'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Mic, MicOff, Play, RotateCcw } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Google Generative AI

const genAI = new GoogleGenerativeAI('')
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
// Language options
const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ru', label: 'Russian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ja', label: 'Japanese' }
]

declare global {
    interface Window {
        SpeechRecognition: any
        webkitSpeechRecognition: any
        SpeechSynthesisUtterance: any
    }
}

export default function TranslationApp() {
    const [isListening, setIsListening] = useState(false)
    const [sourceLanguage, setSourceLanguage] = useState('en')
    const [targetLanguage, setTargetLanguage] = useState('es')
    const [transcript, setTranscript] = useState('')
    const [translatedText, setTranslatedText] = useState('')
    const [isTranslating, setIsTranslating] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)

    const recognitionRef = useRef<SpeechRecognition | null>(null)

    // Initialize speech recognition
    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            ('SpeechRecognition' in window ||
                'webkitSpeechRecognition' in window)
        ) {
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = true
            recognitionRef.current.interimResults = true

            recognitionRef.current.onresult = async (event) => {
                let interimTranscript = ''
                let finalTranscript = ''

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript
                    } else {
                        interimTranscript += transcript
                    }
                }

                setTranscript((prev) => prev + finalTranscript)

                if (finalTranscript) {
                    await translateText(finalTranscript)
                }
            }

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event.error)
                setIsListening(false)
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [])

    // Update recognition language when source language changes
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = sourceLanguage
        }
    }, [sourceLanguage])

    // Toggle listening
    const toggleListening = () => {
        if (isListening) {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
            setIsListening(false)
        } else {
            if (recognitionRef.current) {
                recognitionRef.current.start()
            }
            setIsListening(true)
        }
    }

    // Reset all
    const resetAll = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
        }
        setIsListening(false)
        setTranscript('')
        setTranslatedText('')
    }

    // Translate text using AI
    const translateText = async (text: string) => {
        if (!text.trim()) return

        try {
            setIsTranslating(true)

            const sourceLang =
                languages.find((l) => l.value === sourceLanguage)?.label ||
                'English'
            const targetLang =
                languages.find((l) => l.value === targetLanguage)?.label ||
                'Spanish'

            const correctionPrompt = `Correct the following healthcare conversation text. Maintain medical accuracy and terminology. Only return the corrected text, nothing else.
            
            Text to correct: "${text}"`

            const correctionResult = await model.generateContent(correctionPrompt)
            const correctedText = correctionResult.response.text()

            const translationPrompt = `Translate the following healthcare conversation from ${sourceLang} to ${targetLang}. 
                Maintain medical accuracy and terminology. Only return the translated text, nothing else.
                
                Text to translate: "${correctedText}"`

            const translationResult = await model.generateContent(translationPrompt)
            setTranslatedText(translationResult.response.text())
        } catch (error) {
            console.error('Translation error:', error)
        } finally {
            setIsTranslating(false)
        }
    }

    // Speak translated text
    const speakTranslatedText = () => {
        if (!translatedText || isSpeaking) return

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(translatedText)
            utterance.lang = targetLanguage
            utterance.onend = () => setIsSpeaking(false)

            setIsSpeaking(true)
            window.speechSynthesis.speak(utterance)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="source-language"
                        className="text-sm font-medium"
                    >
                        Source Language
                    </label>
                    <Select
                        value={sourceLanguage}
                        onValueChange={setSourceLanguage}
                    >
                        <SelectTrigger
                            id="source-language"
                            className="w-[180px]"
                        >
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="target-language"
                        className="text-sm font-medium"
                    >
                        Target Language
                    </label>
                    <Select
                        value={targetLanguage}
                        onValueChange={setTargetLanguage}
                    >
                        <SelectTrigger
                            id="target-language"
                            className="w-[180px]"
                        >
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="h-[300px] md:h-[400px] flex flex-col">
                    <CardContent className="flex-1 p-4 overflow-auto">
                        <h2 className="font-semibold mb-2">
                            Original Transcript
                        </h2>
                        <div className="whitespace-pre-wrap">
                            {transcript || (
                                <span className="text-muted-foreground italic">
                                    {isListening
                                        ? 'Listening...'
                                        : 'Press the microphone button to start speaking'}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-[300px] md:h-[400px] flex flex-col">
                    <CardContent className="flex-1 p-4 overflow-auto">
                        <h2 className="font-semibold mb-2">Translated Text</h2>
                        <div className="whitespace-pre-wrap">
                            {translatedText || (
                                <span className="text-muted-foreground italic">
                                    {isTranslating
                                        ? 'Translating...'
                                        : 'Translation will appear here'}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <Button
                    onClick={toggleListening}
                    variant={isListening ? 'destructive' : 'default'}
                    className="gap-2"
                >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                    {isListening ? 'Stop Recording' : 'Start Recording'}
                </Button>

                <Button
                    onClick={speakTranslatedText}
                    disabled={!translatedText || isSpeaking}
                    className="gap-2"
                >
                    <Play size={18} />
                    Speak Translation
                </Button>

                <Button onClick={resetAll} variant="outline" className="gap-2">
                    <RotateCcw size={18} />
                    Reset
                </Button>
            </div>
        </div>
    )
}
