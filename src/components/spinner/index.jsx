import ClipLoader from 'react-spinners/ClipLoader';

export const Spinner = () => {
  return (
    <div className='w-fit py-8 mx-auto'>
      <ClipLoader
        color='#404b5a'
        size={20}
        speedMultiplier={2.5}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};
