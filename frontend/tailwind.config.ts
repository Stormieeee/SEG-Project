import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        vote: 'vote 0.5s ease-in',
      },

      keyframes: {
        vote: {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(-10deg)',
          },
          '75%': {
            transform: 'rotate(10deg)',
          },
        },
      },

      
      colors:{
        'white' :{
          50: "#FEFEFE",
          100: "#FBFBFB",
          200: "#F9F9F9",
          300: "#F6F6F6",
          400: "#F5F5F5",
          500: "#F2F2F2",
          600: "#DCDCDC",
          700: "#ACACAC",
          800: "#858585",
          900: "#666666",
        },
  
        'black' :{
          50: "#EAEAEB",
          100: "#BFBFC1",
          200: "#A0A0A3",
          300: "#747478",
          400: "#59595E",
          500: "#303036",
          600: "#2C2C31",
          700: "#222226",
          800: "#1A1A1E",
          900: "#141417",
        },

        'primary' :{
          50: "#E6F7FC",
          100: "#B0E6F5",
          200: "#8ADAF1",
          300: "#54C9EA",
          400: "#33BEE6",
          500: "#00AEE0",
          600: "#009ECC",
          700: "#007C9F",
          800: "#00607B", 
          900: "#00495E",
        },

        'red' :{
          50: "#FBEAEA",
          100: "#F4BDBD",
          200: "#EE9D9D",
          300: "#E67171",
          400: "#E15555",
          500: "#DA2B2B",
          600: "#C62727",
          700: "#9B1F1F",
          800: "#781818",
          900: "#5C1212",
        },

        'secondary' :{
          50: "#E9F2FC",
          100: "#BCD6F6",
          200: "#9BC3F2",
          300: "#6EA7EC",
          400: "#5196E8",
          500: "#267CE2",
          600: "#2371CE",
          700: "#1B58A0",
          800: "#15447C",
          900: "#10345F",
        }
      },
    },

    fontFamily:{
      'inter' : 'Inter',
    },

    
  },
  plugins: [],
};
export default config;
