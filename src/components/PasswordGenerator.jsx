import React, { useState } from "react";
import ShowPassword from "./ShowPassword";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeUppercaseLetters, setIncludeUppercaseLetters] = useState(true);
  const [includeLowercaseLetters, setIncludeLowercaseLetters] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy password: ", err);
    }
  };

  const generatePassword = () => {
    setCopied(false);
    if (passwordLength < 10) {
      setPassword("");
      return;
    }
    if (
      !(
        includeUppercaseLetters ||
        includeLowercaseLetters ||
        includeNumbers ||
        includeSpecialChars
      )
    ) {
      // If none of the options are selected, show a warning
      setShowWarning(true);
      setShowPassword(false);
      setPassword("");
      return;
    }

    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()-+=:;.@#$!&";

    let characters = "";

    if (includeUppercaseLetters) {
      characters += uppercaseLetters;
    }

    if (includeLowercaseLetters) {
      characters += lowercaseLetters;
    }

    if (includeNumbers) {
      characters += numbers;
    }

    if (includeSpecialChars) {
      characters += specialChars;
    }

    let newPassword = "";
    const charactersLength = characters.length;

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      newPassword += characters.charAt(randomIndex);
    }

    setPassword(newPassword);
    setShowPassword(true);
    setShowWarning(false);
  };

  return (
    <div className="flex flex-col align-middle items-center min-h-screen justify-center">
      <div className="flex flex-col bg-gray-100 w-1/2 rounded-xl shadow-lg bg-opacity-80 p-4 items-center">
        <h1 className="text-2xl text-black  font-bold mt-5">
          Random Password Generator
        </h1>
        <div className="flex flex-col items-center m-4 capitalize font-medium">
          <label htmlFor="length"> enter password length</label>
          <input
            id="length"
            type="number"
            className="rounded-lg p-1 border border-gray-600"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div className="flex flex-col justify-start align-top items-start gap-1">
          <div className="flex flex-row items-center justify-center align-middle">
            <input
              type="checkbox"
              id="uppercaseLetters"
              checked={includeUppercaseLetters}
              onChange={() =>
                setIncludeUppercaseLetters(!includeUppercaseLetters)
              }
            />
            <label htmlFor="uppercaseLetters" className="ml-2">
              Include Uppercase Letters
            </label>
          </div>

          <div className="flex flex-row items-center justify-center align-middle">
            <input
              type="checkbox"
              id="lowercase"
              checked={includeLowercaseLetters}
              onChange={() =>
                setIncludeLowercaseLetters(!includeLowercaseLetters)
              }
            />
            <label htmlFor="lowercase" className="ml-2">
              Include LowerCase Letters
            </label>
          </div>

          <div className="flex flex-row items-center justify-center align-middle">
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            <label htmlFor="numbers" className="ml-2">
              Include Numbers
            </label>
          </div>

          <div className="flex flex-row items-center justify-center align-middle">
            <input
              type="checkbox"
              id="specialChars"
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
            />
            <label htmlFor="specialChars" className="ml-2">
              Include Special Characters
            </label>
          </div>

          {showWarning && (
            <div className="text-red-600 rounded-md">
              *please select at least one option.
            </div>
          )}
        </div>

        <div className="flex flex-col my-5">
          <button
            type="submit"
            className="bg-blue-700 py-1 px-4 rounded-xl w-28 mx-auto text-white"
            onClick={generatePassword}
          >
            Generate{" "}
          </button>

          {showPassword && (
            <ShowPassword
              password={password}
              copied={copied}
              handleCopy={handleCopy}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
