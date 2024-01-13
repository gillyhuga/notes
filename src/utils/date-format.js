export const formatCreatedAt = (dateString) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(dateString).toLocaleString('en-US', options);
};