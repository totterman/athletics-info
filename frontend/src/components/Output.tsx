import { useSelector } from "react-redux";
import { RootState } from "../storage/storage";

export function Output() {

    const qListRef = useSelector((storage: RootState) => storage.question.qaList);

    return(
        <div className="container mx-auto py-4 h-[calc(100%-24rem)] overflow-y-auto">
            <ul className="list-none">
                {qListRef.map((qa) => (
                    <li key={qa.prompt} className="border-b py-4">
                        <h3 className="bg-slate-100 font-semibold ">{qa.prompt}</h3>
                        <div>{qa.answer}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}