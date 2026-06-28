/**
 * AI Estimation Service
 * Uses AI to estimate task effort and suggest due dates based on task description
 */

const axios = require('axios');

// Mock AI estimation function - can be replaced with actual AI API calls
const generateAIEstimate = async (taskDescription, context = {}) => {
	try {
		// TODO: Replace with actual AI API integration (OpenAI, Anthropic, etc.)
		// This is a mock implementation that returns realistic estimates

		const estimate = analyzeTaskComplexity(taskDescription, context);
		return estimate;
	} catch (error) {
		console.error('AI Estimation Error:', error);
		throw new Error('Failed to generate AI estimate');
	}
};

/**
 * Analyzes task description to estimate effort and complexity
 * Uses keyword analysis and heuristics
 */
const analyzeTaskComplexity = (description, context = {}) => {
	// Complexity keywords
	const highComplexityKeywords = [
		'refactor',
		'redesign',
		'implement',
		'optimize',
		'security',
		'database',
		'integration',
		'migration',
	];
	const mediumComplexityKeywords = [
		'update',
		'fix',
		'improve',
		'add',
		'modify',
		'debug',
		'test',
	];
	const lowComplexityKeywords = [
		'review',
		'documentation',
		'typo',
		'minor',
		'update copy',
	];

	const lowerDescription = description.toLowerCase();

	// Count keyword occurrences
	let complexityScore = 0;
	highComplexityKeywords.forEach((keyword) => {
		if (lowerDescription.includes(keyword)) complexityScore += 3;
	});
	mediumComplexityKeywords.forEach((keyword) => {
		if (lowerDescription.includes(keyword)) complexityScore += 2;
	});
	lowComplexityKeywords.forEach((keyword) => {
		if (lowerDescription.includes(keyword)) complexityScore += 1;
	});

	// Estimate effort in hours based on complexity
	let estimatedHours = 2; // baseline
	if (complexityScore >= 6) estimatedHours = 8;
	else if (complexityScore >= 4) estimatedHours = 5;
	else if (complexityScore >= 2) estimatedHours = 3;

	// Determine priority based on keywords
	let priority = 'medium';
	if (
		lowerDescription.includes('urgent') ||
		lowerDescription.includes('critical') ||
		lowerDescription.includes('asap') ||
		lowerDescription.includes('immediately')
	) {
		priority = 'urgent';
	} else if (
		lowerDescription.includes('high') ||
		lowerDescription.includes('important')
	) {
		priority = 'high';
	} else if (
		lowerDescription.includes('low') ||
		lowerDescription.includes('minor')
	) {
		priority = 'low';
	}

	// Calculate suggested due date
	const todayDate = new Date();
	const daysToAdd = Math.ceil(estimatedHours / 8); // Convert hours to working days
	const suggestedDueDate = new Date(todayDate);
	suggestedDueDate.setDate(suggestedDueDate.getDate() + daysToAdd);

	return {
		estimatedEffort: estimatedHours,
		unit: 'hours',
		priority: priority,
		suggestedDueDate: suggestedDueDate,
		complexity: getComplexityLevel(complexityScore),
		confidence: Math.min(100, 60 + complexityScore * 5), // Confidence percentage
	};
};

const getComplexityLevel = (score) => {
	if (score >= 6) return 'high';
	if (score >= 2) return 'medium';
	return 'low';
};

/**
 * Estimate multiple tasks in batch
 */
const estimateBatch = async (tasks) => {
	return Promise.all(
		tasks.map((task) =>
			generateAIEstimate(task.description, { title: task.title })
		)
	);
};

module.exports = {
	generateAIEstimate,
	analyzeTaskComplexity,
	estimateBatch,
};
