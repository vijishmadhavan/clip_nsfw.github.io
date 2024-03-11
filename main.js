class NsfwDetector {
    constructor() {
        // Encapsulate thresholds and image classes as private class variables
        this._threshold = 0.5; // Example threshold
        this._nsfwLabels = [
            'FEMALE_BREAST_EXPOSED',
            'FEMALE_GENITALIA_EXPOSED',
            'BUTTOCKS_EXPOSED',
            'ANUS_EXPOSED',
            'MALE_GENITALIA_EXPOSED',
            'BLOOD_SHED',
            'VIOLENCE',
            'GORE',
            'PORNOGRAPHY',
            'DRUGS',
            'ALCOHOL',
        ];
    }

    async isNsfw(imageUrl) {
        try {
            // Initialize the classification pipeline with the specified model
            const classifier = await window.pipeline('zero-shot-image-classification', 'Xenova/clip-vit-base-patch32');

            // Perform classification using encapsulated labels
            const output = await classifier(imageUrl, this._nsfwLabels);

            // Log the classification results for debugging
            console.log(output);

            // Determine if the image is NSFW based on encapsulated threshold
            const nsfwDetected = output.some(result => result.score > this._threshold);

            // Return true if NSFW content is detected, false otherwise
            return nsfwDetected;
        } catch (error) {
            console.error('Error during NSFW classification: ', error);
            throw error;
        }
    }
}

// Export the NsfwDetector class so it can be imported in other files
export { NsfwDetector };
