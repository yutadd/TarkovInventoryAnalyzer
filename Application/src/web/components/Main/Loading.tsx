import { useEffect, useState } from "react"

export const Loading = () => {
    const [loadingText, setLoadingText] = useState("Loading")
    useEffect(() => {
        let loadingFrame = 0;
        setInterval(() => {
            loadingFrame += 1;
            let text = "Loading";
            for (let i = 0; i < loadingFrame%5; i++)text += "."
            setLoadingText(text)
        }, 400);
    }, []
    )
    return (<div className="LoadingText">{loadingText}</div>)
}