type Props = {
  color?: string
}

const EditIcon = ({ color = '#000000' }: Props) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
    >
      <path d="M815.9424 332.0192l-123.8208-123.9104 64.0448-64.0896c21.344-21.3568 55.5072-21.3568 72.5824 0l51.2384 51.2768c21.3504 21.3632 21.3504 55.5456 0 72.64L815.9424 332.0192 815.9424 332.0192zM457.2992 690.9184 333.4784 567.008l337.2928-333.2544 123.8208 123.8976L457.2992 690.9184 457.2992 690.9184zM235.2832 793.4592l76.8512-200.8128 123.8208 123.904L235.2832 793.4592 235.2832 793.4592zM866.0928 836.1856c17.088 0 29.9008 12.8128 29.9008 29.9008 0 17.0944-12.8128 29.9136-29.9008 29.9136L157.9072 896c-18.72 0-29.9072-12.8192-29.9072-29.9136 0-17.088 12.8128-29.9008 29.9072-29.9008L866.0928 836.1856 866.0928 836.1856zM865.8112 836.1856" />
    </svg>
  )
}

export default EditIcon