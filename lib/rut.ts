export const cleanRut = (value: string) => {
    return value.replace(/[^0-9kK]/g, "").slice(0, 9);;
};

// Aplica el formato 11.111.111-1
export const formatRut = (value: string) => {
    const cleaned = cleanRut(value);

    if (cleaned.length <= 1) return cleaned;

    const dv = cleaned.slice(-1).toUpperCase();
    const body = cleaned.slice(0, -1);

    return (
        body.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
        "-" +
        dv
    );
};