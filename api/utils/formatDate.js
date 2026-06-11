
// Formats a date as YYYY-MM-DD (strips the time component)
const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0]
}

export default formatDate