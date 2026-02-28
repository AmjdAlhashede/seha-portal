export const validateID = (id) => {
    if (!id) return -1;
    id = id.trim();
    if (isNaN(parseInt(id)) || id.length !== 10) {
        return -1;
    }
    return 0;
};

export const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
        const date = new Date(dateStr);
        return date.toISOString().split("T")[0];
    } catch (e) {
        return dateStr;
    }
};

export const formatRelationship = (rel) => {
    const relationships = {
        1: "أم", 2: "أب", 3: "أخ", 4: "أخت", 5: "ابن", 6: "ابنة",
        7: "زوج", 8: "زوجة", 9: "جد", 10: "جدة", 11: "الخال",
        12: "العم", 13: "الخالة", 14: "العمة", 15: "ابن الأخت",
        16: "ابن الأخ", 17: "ابنة الأخت", 18: "ابنة الأخ"
    };
    return relationships[rel] || "";
};
