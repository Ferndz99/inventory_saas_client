import { useOnboarding } from '@/contexts/OnboardingContext'

function OnboardingDebug() {
    const ctx = useOnboarding()

    return (
        <pre className="fixed bottom-4 right-4 bg-black text-green-400 p-4 text-xs rounded-lg max-w-sm overflow-auto z-50">
            {JSON.stringify(ctx, null, 2)}
        </pre>
    )
}

export default OnboardingDebug