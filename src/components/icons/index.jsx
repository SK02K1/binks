export const Heart = ({ isLiked }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill={isLiked ? '#ff0000' : 'none'}
      strokeWidth='1.5'
      color='#000'
      viewBox='0 0 24 24'
    >
      <path
        stroke='#000'
        strokeLinejoin='round'
        d='M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z'
      ></path>
    </svg>
  );
};

export const Comment = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='none'
      strokeWidth='1.5'
      color='#000'
      viewBox='0 0 24 24'
    >
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22z'
      ></path>
    </svg>
  );
};

export const Edit = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      fill='none'
      strokeWidth='1.5'
      color='#000'
      viewBox='0 0 24 24'
    >
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3 21h18M12.222 5.828L15.05 3 20 7.95l-2.828 2.828m-4.95-4.95l-5.607 5.607a1 1 0 00-.293.707v4.536h4.536a1 1 0 00.707-.293l5.607-5.607m-4.95-4.95l4.95 4.95'
      ></path>
    </svg>
  );
};

export const Trash = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='none'
      strokeWidth='1.5'
      color='#000'
      viewBox='0 0 24 24'
    >
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75'
      ></path>
    </svg>
  );
};
