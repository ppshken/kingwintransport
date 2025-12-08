/**
 * Convert Thai/English text to URL-friendly slug
 * @param {string} text - Text to convert
 * @returns {string} - URL-friendly slug
 */
const slugify = (text) => {
    // Thai character mapping to romanized equivalents
    const thaiMap = {
        'ก': 'k', 'ข': 'kh', 'ค': 'kh', 'ฆ': 'kh', 'ง': 'ng',
        'จ': 'ch', 'ฉ': 'ch', 'ช': 'ch', 'ซ': 's', 'ฌ': 'ch',
        'ญ': 'y', 'ฎ': 'd', 'ฏ': 't', 'ฐ': 'th', 'ฑ': 'th',
        'ฒ': 'th', 'ณ': 'n', 'ด': 'd', 'ต': 't', 'ถ': 'th',
        'ท': 'th', 'ธ': 'th', 'น': 'n', 'บ': 'b', 'ป': 'p',
        'ผ': 'ph', 'ฝ': 'f', 'พ': 'ph', 'ฟ': 'f', 'ภ': 'ph',
        'ม': 'm', 'ย': 'y', 'ร': 'r', 'ล': 'l', 'ว': 'w',
        'ศ': 's', 'ษ': 's', 'ส': 's', 'ห': 'h', 'ฬ': 'l',
        'อ': 'o', 'ฮ': 'h',
        // Vowels
        'ะ': 'a', 'ั': 'a', 'า': 'a', 'ิ': 'i', 'ี': 'i',
        'ึ': 'ue', 'ื': 'ue', 'ุ': 'u', 'ู': 'u', 'เ': 'e',
        'แ': 'ae', 'โ': 'o', 'ใ': 'ai', 'ไ': 'ai', '่': '',
        '้': '', '๊': '', '๋': '', '็': '', '์': '', 'ํ': '', 'ๆ': ''
    };

    return text
        .toLowerCase()
        .trim()
        // Replace Thai characters
        .split('')
        .map(char => thaiMap[char] || char)
        .join('')
        // Replace spaces and special characters with hyphens
        .replace(/[\s\W-]+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-+|-+$/g, '')
        // Limit length
        .substring(0, 100);
};

module.exports = slugify;
