import { useTheme } from '../lib/context/ThemeContext';
import {
    MdOutlineBrightness2,
    MdOutlineWbSunny,
} from 'react-icons/md';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="text-right">
            <button
                className="btn btn-square btn-outline btn-sm btn-neutral text-center"
                onClick={toggleTheme}
            >
                {theme === 'dark' ? <MdOutlineWbSunny /> : <MdOutlineBrightness2 />}
            </button>
        </div>
    );
};

export default ThemeToggle;
