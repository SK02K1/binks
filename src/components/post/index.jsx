export const Post = ({ post }) => {
  const { user, content } = post;
  const { firstname, lastname } = user;
  return (
    <div className='py-4 px-8 border-b hover:bg-sky-50'>
      <div className='flex items-center'>
        <img
          className='rounded-full bg-slate-200 w-12 h-12 border-2	 border-slate-300'
          src='https://getbinks.com/_next/static/media/large-logo.ee207193.svg'
          alt='user avatar'
        />
        <h2 className='text-md ml-2'>
          {firstname} {lastname}
        </h2>
      </div>
      <p className='py-4'>{content}</p>
    </div>
  );
};
