import { MouseEventHandler } from "react";
import logo from '../logo.svg';

export type HeaderProps = {
  toggleExplain?: MouseEventHandler<HTMLButtonElement>;
}
export function Header(props: HeaderProps) {
    return (
        <div className="container mx-auto h-28">
      <header className="flex justify-between place-items-center top-0 z-10 py-4 bg-slate-900">
        <div className="flex place-items-center">
        <div className="ml-6 cursor-pointer">
          <img src={logo} alt="Logo" className="inline-block h-20" />
        </div>
        <div className="text-4xl font-semibold text-slate-200">
          <div>Athletics Info</div>
        </div>
        </div>
        <div className="flex place-items-center">
        <div className="text-3xl font-normal px-10 text-slate-200">
          <button onClick={props.toggleExplain}>Explain</button>
        </div>
        </div>
      </header>
        </div>
      );
}