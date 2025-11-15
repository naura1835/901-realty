const ShieldIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      width="50"
      height="50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M41.6667 27.0834c0 10.4166-7.2917 15.625-15.9583 18.6458a2.0838 2.0838 0 0 1-1.3959-.0208c-8.6875-3-15.9791-8.2084-15.9791-18.625V12.5a2.0833 2.0833 0 0 1 2.0833-2.0833c4.1667 0 9.375-2.5 13-5.6667a2.4375 2.4375 0 0 1 3.1667 0c3.6458 3.1875 8.8333 5.6667 13 5.6667A2.0833 2.0833 0 0 1 41.6667 12.5v14.5834Z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m18.75 24.9999 4.1667 4.1667 8.3333-8.3333"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShieldIcon;
