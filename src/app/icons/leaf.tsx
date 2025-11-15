const LeafIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      width="50"
      height="50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.9167 41.6668a14.5834 14.5834 0 0 1-2.5-28.9584c11.875-2.2917 15-3.375 19.1667-8.5417 2.0833 4.1667 4.1667 8.7084 4.1667 16.6667 0 11.4584-9.9584 20.8334-20.8334 20.8334Z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.1666 43.75c0-6.25 3.8542-11.1667 10.5834-12.5 5.0416-1 10.25-4.1667 12.3333-6.25"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeafIcon;
