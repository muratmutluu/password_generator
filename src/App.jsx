import { useCallback, useEffect, useState } from "react";
import { CircleCheck, Copy } from "lucide-react";
import copy from "copy-to-clipboard";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

function App() {
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState(12);

  const generatePassword = useCallback(() => {
    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setValue(password);
    setCopied(false);
  }, [length]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  function handleLengthChange(e) {
    const newValue = Math.max(1, Math.min(72, Number(e.target.value)));
    setLength(newValue);
  }

  function copyToClipboard() {
    if (value !== "") {
      copy(value);
      setCopied(true);

      const duration = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(duration);
    }
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex flex-col items-center p-10 m-2 border rounded-xl shadow-xl">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="light" />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        <div className="divider"></div>

        <h1 className="text-5xl max-md:text-3xl font-bold">🗝️ Şifre Oluşturucu</h1>

        <div className="divider"></div>

        <div className="w-full flex justify-center gap-2">
          <div className="inline-flex items-center relative w-full max-w-xs">
            <button
              onClick={copyToClipboard}
              className="btn btn-ghost btn-sm btn-circle absolute right-0 mr-2"
            >
              <Copy />
            </button>
            <input
              type="text"
              placeholder="***********"
              className="input input-bordered w-full"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button onClick={generatePassword} className="btn btn-primary">
            Oluştur !
          </button>
        </div>

        {copied && (
          <div className="toast toast-center">
            <div className="alert alert-success inline-flex mt-5 max-w-xs text-white font-bold">
              <CircleCheck />
              <span>Kopyalandı !</span>
            </div>
          </div>
        )}

        <div className="divider"></div>
        <h2 className="text-3xl max-md:text-xl font-bold">Şifreni Özelleştir ✨</h2>

        <div className="w-full mt-4">
          <label className="text-md font-semibold">Şifre Uzunluğu</label>
          <div className="inline-flex items-center mt-2 justify-between w-full gap-2">
            <input
              type="number"
              className="input input-bordered w-20"
              value={length}
              onChange={(e) => handleLengthChange(e)}
            />
            <input
              type="range"
              min={1}
              max={72}
              value={length}
              onChange={(e) => handleLengthChange(e)}
              className="range range-primary range-sm max-w-xs"
            />
          </div>

          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
