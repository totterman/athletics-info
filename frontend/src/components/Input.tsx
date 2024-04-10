import { FormEvent,  } from "react";
import { getAnswer } from "../services/getAnswer";
import { Question } from "../types/question";
import { useDispatch } from "react-redux";
import { add, clear } from "../storage/questionSlice";

export function Input() {

    const dispatch = useDispatch();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const prompt = formData.get('prompt') as string;
        if (prompt === undefined || prompt === '')
        return;
        getAnswer(prompt).then((data) => {
            const qa: Question = {
                prompt: prompt,
                answer:  data,    
            };
            dispatch(add(qa));
            console.log('New Question:', prompt, data);
        });
    }

    function handleReset(e: FormEvent<HTMLFormElement>) {
    }

    function handleClear() {
        console.log('Clear pressed');
        dispatch(clear());
    }

    return(
        <div className="container mx-auto py-4 h-28">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="flex flex-col mb-2">
                    <label htmlFor="prompt">Your question:</label>
                    <input id="prompt" type="text" name="prompt" maxLength={2000} />
                </div>
                <button type="submit" className="mt-2 h-10 px-6  text-slate-100 font-semibold bg-black">Submit</button>
                <button type="button" onClick={handleClear} className="mt-2 h-10 px-6  text-black font-semibold bg-slate-100">Clear</button>
            </form>
        </div>
    );
}