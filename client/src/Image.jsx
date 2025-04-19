export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://nest-quest-backend.vercel.app/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }