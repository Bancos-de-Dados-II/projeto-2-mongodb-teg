import "./style.css";

interface ChartProps {
    src: string;
}

export function Chart({ src }: ChartProps) {
    return (
        <iframe
            className="chart"
            src={src}
        >
        </iframe>
    );
}