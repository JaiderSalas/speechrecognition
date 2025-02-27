import TranslationApp from './components/translation-app'

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col">
            <header className="bg-white border-b py-4 px-6 sticky top-0 z-10">
                <h1 className="text-2xl font-bold text-primary">
                    Healthcare Translator
                </h1>
            </header>
            <div className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
                <TranslationApp />
            </div>
            <footer className="bg-white border-t py-4 px-6 text-center text-sm text-muted-foreground">
                Healthcare Translation Web App with Generative AI
            </footer>
        </main>
    )
}
