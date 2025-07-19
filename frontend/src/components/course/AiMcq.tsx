"use client";
import React, { useEffect, useState } from "react";
import { useChat } from "./ai-help/hooks/useChat";
import { MCQ } from "./ai-help/types";
import { McqPopup } from "./McqPopup";

export default function AiMcq({ chapterText,handleMcqComplete }: { chapterText: string,handleMcqComplete: (score: number) => Promise<void> }) {
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [showSubmit, setShowSubmit] = useState(true);
  const { generateMCQs, generateFeedback } = useChat();

  const loadMcqs = async () => {
    setLoading(true);
    try {
      const questions = await generateMCQs(chapterText);
      setMcqs(questions);
      setAnswers({});
      setScore(null);
      setShowSubmit(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMcqs();
  }, [chapterText]);

  const handleAnswerChange = (questionId: number, selectedAnswer: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = async () => {
    const totalQuestions = mcqs.length;
    const correctAnswers = mcqs.reduce(
      (acc, mcq) => (answers[mcq.id] === mcq.correctAnswer ? acc + 1 : acc),
      0
    );
    const scoreValue = (correctAnswers / totalQuestions) * 100;
    setScore(scoreValue);
    handleMcqComplete(scoreValue)

    const aiFeedback = await generateFeedback(mcqs, answers, scoreValue);
    setFeedback(aiFeedback);
    setShowPopup(true);
    setShowSubmit(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Chapter Assessment</h2>
        <div className="space-y-6">
          {mcqs.map((mcq) => (
            <div key={mcq.id} className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">{mcq.question}</h3>
              <div className="space-y-3">
                {mcq.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer
                      ${
                        answers[mcq.id] === index
                          ? "border-blue-900 bg-blue-50"
                          : "border-gray-200 hover:border-blue-200"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={`question-${mcq.id}`}
                      value={index}
                      checked={answers[mcq.id] === index}
                      onChange={() => handleAnswerChange(mcq.id, index)}
                      className="w-4 h-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          {showSubmit ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(answers).length !== mcqs.length}
            >
              Submit Assessment
            </button>
          ) : (
            <button
              onClick={loadMcqs}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Retake Assessment
            </button>
          )}
        </div>
      </div>

      {showPopup && (
        <McqPopup
          mcqs={mcqs}
          answers={answers}
          score={score ?? 0}
          feedback={feedback}
          isOpen={showPopup}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
}
