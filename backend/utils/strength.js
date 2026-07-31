import zxcvbn from "zxcvbn";

const STRENGTH_LEVELS = ["weak", "fair", "good", "strong", "very strong"];

export const getStrength = (password) => {
    const result =  zxcvbn(password);
    return STRENGTH_LEVELS[result.score];
};