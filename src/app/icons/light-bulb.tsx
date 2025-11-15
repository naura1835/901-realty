const LightBulbIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      width="50"
      height="50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M31.25 29.1667c.4167-2.0833 1.4583-3.5416 3.125-5.2083 2.0833-1.875 3.125-4.5833 3.125-7.2917a12.5 12.5 0 0 0-25 0c0 2.0834.4167 4.5834 3.125 7.2917 1.4583 1.4583 2.7083 3.125 3.125 5.2083"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 37.5h12.5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.8334 45.8333h8.3333"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LightBulbIcon;
