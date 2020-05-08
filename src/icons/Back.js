export const Back = (props) => {
  return (
    <svg fill="none" height={24} viewBox="0 0 24 24" width={24} {...props}>
      <g clipPath="url(#prefix__clip0)" fill="currentColor">
        <path d="M16.5 12.75h-9a.752.752 0 01-.75-.75c0-.412.338-.75.75-.75h9c.413 0 .75.338.75.75s-.337.75-.75.75z" />
        <path d="M11.25 17.25a.743.743 0 01-.578-.27l-3.75-4.5a.748.748 0 010-.96l3.75-4.5a.756.756 0 011.058-.097c.315.262.36.734.097 1.057L8.475 12l3.352 4.02a.75.75 0 01-.577 1.23z" />
      </g>
      <rect
        height={22}
        rx={11}
        stroke="currentColor"
        strokeWidth={2}
        width={22}
        x={1}
        y={1}
      />
      <defs>
        <clipPath id="prefix__clip0">
          <path d="M6.75 6.75h10.5v10.5H6.75z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};
