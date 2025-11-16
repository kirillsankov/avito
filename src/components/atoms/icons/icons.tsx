import { motion } from 'framer-motion';

interface IconProps {
    className?: string;
    size?: number;
}

const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
            duration: 0.3, 
            ease: "easeOut" as const,
            delay: 0.1
        }
    },
    tap: { scale: 0.9 }
};

const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
        pathLength: 1, 
        opacity: 1,
        transition: { 
            duration: 0.5,
            ease: "easeInOut" as const,
            delay: 0.15
        }
    }
};

export function CheckIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.polyline 
                points="20 6 9 17 4 12"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function XIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.line 
                x1="18" y1="6" x2="6" y2="18"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="6" y1="6" x2="18" y2="18"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function EditIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.path 
                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.path 
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function ChartBarIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.line 
                x1="12" y1="20" x2="12" y2="10"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="18" y1="20" x2="18" y2="4"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="6" y1="20" x2="6" y2="16"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function ChartLineIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.polyline 
                points="23 6 13.5 15.5 8.5 10.5 1 18"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline 
                points="17 6 23 6 23 12"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function ChartAreaIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.polyline 
                points="1 12 3 8 7 10 11 6 15 8 21 4"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="21" y1="4" x2="21" y2="20"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="1" y1="12" x2="21" y2="20"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function ClipboardIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.path 
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.rect 
                x="8" y="2" width="8" height="4" rx="1" ry="1"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function ClockIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.circle 
                cx="12" cy="12" r="10"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline 
                points="12 6 12 12 16 14"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function FileTextIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.path 
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline 
                points="14 2 14 8 20 8"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="16" y1="13" x2="8" y2="13"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="16" y1="17" x2="8" y2="17"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline 
                points="10 9 9 9 8 9"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function StarIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.polygon 
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function MoonIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.path 
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function SunIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.circle 
                cx="12" cy="12" r="5"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="12" y1="1" x2="12" y2="3"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="12" y1="21" x2="12" y2="23"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="4.22" y1="4.22" x2="5.64" y2="5.64"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="18.36" y1="18.36" x2="19.78" y2="19.78"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="1" y1="12" x2="3" y2="12"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="21" y1="12" x2="23" y2="12"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="4.22" y1="19.78" x2="5.64" y2="18.36"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line 
                x1="18.36" y1="5.64" x2="19.78" y2="4.22"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function CircleIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.circle 
                cx="12" cy="12" r="10"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function DownloadIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline
                points="7 10 12 15 17 10"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line
                x1="12"
                y1="15"
                x2="12"
                y2="3"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function HomeIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.path
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline
                points="9 22 9 12 15 12 15 22"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function BookmarkIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.path
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function MenuIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.line
                x1="3"
                y1="18"
                x2="21"
                y2="18"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function ArrowUpIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.line
                x1="12"
                y1="19"
                x2="12"
                y2="5"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline
                points="5 12 12 5 19 12"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function ArrowDownIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline
                points="19 12 12 19 5 12"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

export function ArrowUpDownIcon({ className, size = 20 }: IconProps) {
    return (
        <motion.svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            whileTap="tap"
            variants={iconVariants}
        >
            <motion.line
                x1="8"
                y1="3"
                x2="8"
                y2="21"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline
                points="3 8 8 3 13 8"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.polyline
                points="13 16 8 21 3 16"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </motion.svg>
    );
}

