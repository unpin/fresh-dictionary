import { JSX } from "preact/jsx-runtime";

type IconProps = JSX.SVGAttributes<SVGSVGElement> & {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
};

export function AngleLeft({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      {...props}
    >
      <path d="M52.7 267.3c-6.2-6.2-6.2-16.4 0-22.6l160-160c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L86.6 256 235.3 404.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-160-160z" />
    </svg>
  );
}

export function AngleDown({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M212.7 363.3c6.2 6.2 16.4 6.2 22.6 0l160-160c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 329.4 75.3 180.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l160 160z" />
    </svg>
  );
}

export function ArrowLeft({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M448 256C448 264.8 440.6 272 431.4 272H54.11l140.7 149.3c6.157 6.531 5.655 16.66-1.118 22.59C190.5 446.6 186.5 448 182.5 448c-4.505 0-9.009-1.75-12.28-5.25l-165.9-176c-5.752-6.094-5.752-15.41 0-21.5l165.9-176c6.19-6.562 16.69-7 23.45-1.094c6.773 5.938 7.275 16.06 1.118 22.59L54.11 240h377.3C440.6 240 448 247.2 448 256z" />
    </svg>
  );
}

export function Ban({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M402.7 425.3l-316-316C52.6 148.6 32 199.9 32 256c0 123.7 100.3 224 224 224c56.1 0 107.4-20.6 146.7-54.7zm22.6-22.6C459.4 363.4 480 312.1 480 256C480 132.3 379.7 32 256 32c-56.1 0-107.4 20.6-146.7 54.7l316 316zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
    </svg>
  );
}

export function Bookmark({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      {...props}
    >
      <path d="M320 0H64C28.72 0 0 28.7 0 64v431.1c0 5.844 3.188 11.23 8.312 14.04c5.125 2.781 11.34 2.562 16.28-.5313L192 402.1l167.4 106.5C362 511.2 365 512 368 512c2.656 0 5.281-.6562 7.688-1.969C380.8 507.2 384 501.8 384 495.1V64C384 28.7 355.3 0 320 0zM352 466.9l-151.4-96.36C197.1 368.8 195 368 192 368s-5.969 .8281-8.594 2.5L32 466.9V64c0-17.64 14.34-32 32-32h256c17.66 0 32 14.36 32 32V466.9z" />
    </svg>
  );
}

export function BookmarkSolid(
  { size, width, height, ...props }: IconProps,
) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      {...props}
    >
      <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
    </svg>
  );
}

export function ClockRotateLeft(
  { size, width, height, ...props }: IconProps,
) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C172.2 512 97.87 471.8 51.19 409.6C45.88 402.5 47.31 392.5 54.37 387.2C61.44 381.9 71.47 383.3 76.78 390.4C117.7 444.8 182.7 480 256 480C379.7 480 480 379.7 480 256C480 132.3 379.7 32 256 32C166.7 32 89.51 84.3 53.55 160H144C152.8 160 160 167.2 160 176C160 184.8 152.8 192 144 192H16C7.164 192 0 184.8 0 176V48C0 39.16 7.164 32 16 32C24.84 32 32 39.16 32 48V131.1C75.66 53.29 159.6 0 256 0zM256 128C264.8 128 272 135.2 272 144V249.4L347.3 324.7C353.6 330.9 353.6 341.1 347.3 347.3C341.1 353.6 330.9 353.6 324.7 347.3L244.7 267.3C241.7 264.3 239.1 260.2 239.1 256V144C239.1 135.2 247.2 128 255.1 128H256z" />
    </svg>
  );
}

export function Copy({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M384 352H224c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32H332.1c4.2 0 8.3 1.7 11.3 4.7l67.9 67.9c3 3 4.7 7.1 4.7 11.3V320c0 17.7-14.3 32-32 32zM433.9 81.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H224c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V416H256v32c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32h64V128H64z" />
    </svg>
  );
}

export function Dummbell({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      {...props}
    >
      <path d="M208 64c8.8 0 16 7.2 16 16V256 432c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V368 144 80c0-8.8 7.2-16 16-16h32zM128 413.3V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272H384V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V413.3c5 1.8 10.4 2.7 16 2.7h32c26.5 0 48-21.5 48-48V272h16c8.8 0 16-7.2 16-16s-7.2-16-16-16H608V144c0-26.5-21.5-48-48-48H528c-5.6 0-11 1-16 2.7V80c0-26.5-21.5-48-48-48H432c-26.5 0-48 21.5-48 48V240H256V80c0-26.5-21.5-48-48-48H176c-26.5 0-48 21.5-48 48V98.7C123 97 117.6 96 112 96H80c-26.5 0-48 21.5-48 48v96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H32v96c0 26.5 21.5 48 48 48h32c5.6 0 11-1 16-2.7zM512 144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16V256 368c0 8.8-7.2 16-16 16H528c-8.8 0-16-7.2-16-16V144zM480 368v64c0 8.8-7.2 16-16 16H432c-8.8 0-16-7.2-16-16V256 80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64V368zM128 144V368c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V256 144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16z" />
    </svg>
  );
}

export function DummbellSolid(
  { size, width, height, ...props }: IconProps,
) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      {...props}
    >
      <path d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z" />
    </svg>
  );
}

export function Ellipsis({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M416 256a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm-160 0a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM64 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" />
    </svg>
  );
}

export function MagnifyingGlass(
  { size, width, height, ...props }: IconProps,
) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z" />
    </svg>
  );
}

export function House({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      {...props}
    >
      <path d="M298.6 4c-6-5.3-15.1-5.3-21.2 0L5.4 244c-6.6 5.8-7.3 16-1.4 22.6s16 7.3 22.6 1.4L64 235V432c0 44.2 35.8 80 80 80H432c44.2 0 80-35.8 80-80V235l37.4 33c6.6 5.8 16.7 5.2 22.6-1.4s5.2-16.7-1.4-22.6L298.6 4zM96 432V206.7L288 37.3 480 206.7V432c0 26.5-21.5 48-48 48H368V320c0-17.7-14.3-32-32-32H240c-17.7 0-32 14.3-32 32V480H144c-26.5 0-48-21.5-48-48zm144 48V320h96V480H240z" />
    </svg>
  );
}

export function HouseSolid({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      {...props}
    >
      <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
    </svg>
  );
}

export function HouseBlank({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      {...props}
    >
      <path d="M277.4 4.002C283.5-1.334 292.5-1.334 298.6 4.002L570.6 244C577.2 249.8 577.8 259.1 571.1 266.6C566.2 273.2 556 273.8 549.4 267.1L512 234.1V432C512 476.2 476.2 512 432 512H144C99.82 512 64 476.2 64 432V234.1L26.59 267.1C19.96 273.8 9.849 273.2 4.003 266.6C-1.844 259.1-1.212 249.8 5.414 244L277.4 4.002zM96 206.7V432C96 458.5 117.5 480 144 480H432C458.5 480 480 458.5 480 432V206.7L288 37.34L96 206.7z" />
    </svg>
  );
}

export function PenToSquare({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M454.6 45.3l12.1 12.1c12.5 12.5 12.5 32.8 0 45.3L440 129.4 382.6 72l26.7-26.7c12.5-12.5 32.8-12.5 45.3 0zM189 265.6l171-171L417.4 152l-171 171c-4.2 4.2-9.6 7.2-15.4 8.6l-65.6 15.1L180.5 281c1.3-5.8 4.3-11.2 8.6-15.4zm197.7-243L166.4 243c-8.5 8.5-14.4 19.2-17.1 30.9l-20.9 90.6c-1.2 5.4 .4 11 4.3 14.9s9.5 5.5 14.9 4.3l90.6-20.9c11.7-2.7 22.4-8.6 30.9-17.1L489.4 125.3c25-25 25-65.5 0-90.5L477.3 22.6c-25-25-65.5-25-90.5 0zM80 64C35.8 64 0 99.8 0 144V432c0 44.2 35.8 80 80 80H368c44.2 0 80-35.8 80-80V304c0-8.8-7.2-16-16-16s-16 7.2-16 16V432c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48H208c8.8 0 16-7.2 16-16s-7.2-16-16-16H80z" />
    </svg>
  );
}

export function ChevronRight({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      {...props}
    >
      <path d="M299.3 244.7c6.2 6.2 6.2 16.4 0 22.6l-192 192c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L265.4 256 84.7 75.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l192 192z" />
    </svg>
  );
}

export function ChevronDown({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M267.3 395.3c-6.2 6.2-16.4 6.2-22.6 0l-192-192c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L256 361.4 436.7 180.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-192 192z" />
    </svg>
  );
}

export function CircleCheck({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z" />
    </svg>
  );
}

export function CircleCheckSolid(
  { size, width, height, ...props }: IconProps,
) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
  );
}

export function CirclePlus({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM240 352c0 8.8 7.2 16 16 16s16-7.2 16-16V272h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V160c0-8.8-7.2-16-16-16s-16 7.2-16 16v80H160c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v80z" />
    </svg>
  );
}

export function Sparkles({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M432 32C440.8 32 448 39.16 448 48V96H496C504.8 96 512 103.2 512 112C512 120.8 504.8 128 496 128H448V176C448 184.8 440.8 192 432 192C423.2 192 416 184.8 416 176V128H368C359.2 128 352 120.8 352 112C352 103.2 359.2 96 368 96H416V48C416 39.16 423.2 32 432 32zM432 320C440.8 320 448 327.2 448 336V384H496C504.8 384 512 391.2 512 400C512 408.8 504.8 416 496 416H448V464C448 472.8 440.8 480 432 480C423.2 480 416 472.8 416 464V416H368C359.2 416 352 408.8 352 400C352 391.2 359.2 384 368 384H416V336C416 327.2 423.2 320 432 320zM123.3 321.8L9.292 269.1C3.627 266.5 0 260.8 0 254.6C0 248.3 3.627 242.6 9.292 240L123.3 187.3L176 73.29C178.6 67.63 184.3 64 190.6 64C196.8 64 202.5 67.63 205.1 73.29L257.8 187.3L371.8 240C377.5 242.6 381.1 248.3 381.1 254.6C381.1 260.8 377.5 266.5 371.8 269.1L257.8 321.8L205.1 435.8C202.5 441.5 196.8 445.1 190.6 445.1C184.3 445.1 178.6 441.5 176 435.8L123.3 321.8zM54.16 254.6L136.8 292.7C143.7 295.9 149.2 301.4 152.4 308.3L190.6 390.9L228.7 308.3C231.9 301.4 237.4 295.9 244.3 292.7L326.9 254.6L244.3 216.4C237.4 213.2 231.9 207.7 228.7 200.8L190.6 118.2L152.4 200.8C149.2 207.7 143.7 213.2 136.8 216.4L54.16 254.6z" />
    </svg>
  );
}

export function SpinnerThird({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      {...props}
    >
      <path d="M288 16C288 7.164 295.2 0 304 0C445.4 0 560 114.6 560 256C560 302.6 547.5 346.4 525.7 384C521.3 391.7 511.5 394.3 503.9 389.9C496.2 385.4 493.6 375.7 498 368C517.1 335.1 528 296.8 528 256C528 132.3 427.7 32 304 32C295.2 32 288 24.84 288 16H288z" />
    </svg>
  );
}

export function Plus({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M240 64c0-8.8-7.2-16-16-16s-16 7.2-16 16V240H32c-8.8 0-16 7.2-16 16s7.2 16 16 16H208V448c0 8.8 7.2 16 16 16s16-7.2 16-16V272H416c8.8 0 16-7.2 16-16s-7.2-16-16-16H240V64z" />
    </svg>
  );
}
export function Trash({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M177.7 32h92.5c5.5 0 10.6 2.8 13.6 7.5L299.1 64H148.9l15.3-24.5c2.9-4.7 8.1-7.5 13.6-7.5zM336.9 64L311 22.6C302.2 8.5 286.8 0 270.3 0H177.7C161.2 0 145.8 8.5 137 22.6L111.1 64H64.1 32 16C7.2 64 0 71.2 0 80s7.2 16 16 16H34.3L59.8 452.6C62.1 486.1 90 512 123.6 512H324.4c33.6 0 61.4-25.9 63.8-59.4L413.7 96H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H416 383.9 336.9zm44.8 32L356.3 450.3C355.1 467 341.2 480 324.4 480H123.6c-16.8 0-30.7-13-31.9-29.7L66.4 96H381.6z" />
    </svg>
  );
}

export function User({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 32c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96S128 180.9 128 128C128 75.06 171.1 32 224 32zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM413.3 480H34.66C33.2 480 32 478.8 32 477.3C32 399.4 95.4 336 173.3 336h101.3C352.6 336 416 399.4 416 477.3C416 478.8 414.8 480 413.3 480z" />
    </svg>
  );
}

export function UserSolid({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
    </svg>
  );
}

export function Volume({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      {...props}
    >
      <path d="M333.2 34.84c-4.201-1.895-8.727-2.841-13.16-2.841c-7.697 0-15.29 2.784-21.27 8.1L163.8 160H80c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9C304.7 477.2 312.3 480 320 480c4.438 0 8.959-.9312 13.16-2.837C344.7 472 352 460.6 352 448V64C352 51.41 344.7 39.1 333.2 34.84zM319.1 447.1L175.1 319.1H80c-8.822 0-16-7.16-16-15.96v-96c0-8.801 7.178-15.96 16-15.96h95.1l143.1-127.1c.0078-.0078-.0039 .0039 0 0L319.1 447.1zM491.4 98.7c-7.344-4.922-17.28-2.953-22.2 4.391s-2.953 17.28 4.391 22.2C517.7 154.8 544 203.7 544 256s-26.33 101.2-70.44 130.7c-7.344 4.922-9.312 14.86-4.391 22.2C472.3 413.5 477.3 416 482.5 416c3.062 0 6.156-.875 8.891-2.703C544.4 377.8 576 319 576 256S544.4 134.2 491.4 98.7zM438.4 178.7c-7.328-4.922-17.28-2.953-22.2 4.391s-2.953 17.28 4.391 22.2C437.8 216.8 448 235.7 448 256s-10.23 39.23-27.38 50.7c-7.344 4.922-9.312 14.86-4.391 22.2C419.3 333.5 424.4 336 429.5 336c3.062 0 6.156-.875 8.891-2.703C464.5 315.9 480 286.1 480 256S464.5 196.1 438.4 178.7z" />
    </svg>
  );
}

export function VolumeSolid({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      {...props}
    >
      <path d="M444.6 181.9c-10.28-8.344-25.41-6.875-33.75 3.406c-8.406 10.25-6.906 25.37 3.375 33.78C425.5 228.4 432 241.8 432 256c0 14.19-6.5 27.62-17.81 36.87c-10.28 8.406-11.78 23.53-3.375 33.78c4.719 5.812 11.62 8.812 18.56 8.812c5.344 0 10.75-1.781 15.19-5.406C467.1 311.6 480 284.7 480 256S467.1 200.4 444.6 181.9zM505.1 108c-10.22-8.344-25.34-6.906-33.78 3.344c-8.406 10.25-6.906 25.37 3.344 33.78C508.6 172.9 528 213.3 528 256s-19.44 83.09-53.31 110.9c-10.25 8.406-11.75 23.53-3.344 33.78c4.75 5.781 11.62 8.781 18.56 8.781c5.375 0 10.75-1.781 15.22-5.437C550.2 367.1 576 313.1 576 256S550.2 144.9 505.1 108zM333.2 34.84c-11.5-5.187-25.01-3.116-34.43 5.259L163.8 160H80c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9C304.7 477.2 312.3 480 320 480c4.438 0 8.959-.9313 13.16-2.837C344.7 472 352 460.6 352 448V64C352 51.41 344.7 39.1 333.2 34.84z" />
    </svg>
  );
}

export function Xmark({ size, width, height, ...props }: IconProps) {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return (
    <svg
      fill="currentColor"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      {...props}
    >
      <path d="M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6l-132.7 132.7c-6.253 6.253-16.37 6.253-22.63 0c-6.253-6.253-6.253-16.37 0-22.63L137.4 256L4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63c6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0c6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7C321.6 394.9 321.6 405.1 315.3 411.3z" />
    </svg>
  );
}
