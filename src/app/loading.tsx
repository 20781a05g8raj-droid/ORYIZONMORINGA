export default function Loading() {
    return (
        <div className="flex min-h-[50vh] w-full items-center justify-center">
            <div className="relative h-16 w-16">
                <div className="absolute h-full w-full rounded-full border-4 border-muted opacity-20"></div>
                <div className="absolute h-full w-full rounded-full border-4 border-t-primary animate-spin"></div>
            </div>
        </div>
    );
}
