import React, { useRef, useState, useEffect } from "react";
import { Save, Download, Eraser, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../../services/api";

interface WhiteboardProps {
  courseId?: string;
  chapterId?: string;
  
}

export function Whiteboard({
  courseId,
  chapterId
  
}: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [brushSize, setBrushSize] = useState(5);
  console.log("Course ID:", courseId);
  console.log("Chapter ID:", chapterId);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (tool === "pencil") {
      ctx.strokeStyle = "black";
      ctx.lineWidth = brushSize;
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    } else if (tool === "eraser") {
      ctx.clearRect(
        e.nativeEvent.offsetX - brushSize / 2,
        e.nativeEvent.offsetY - brushSize / 2,
        brushSize,
        brushSize
      );
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = async () => {
    try {
      if (!courseId || !chapterId) {
        toast.error("Course and chapter information required");
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const imageBlob = await new Promise<string>((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            toast.error("Error creating image");
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      });

      await api.post(`/whiteboard/${courseId}/chapters/${chapterId}/save`, {
        imageBlob,
      });

      toast.success("Drawing saved successfully");
    } catch (error) {
      toast.error("Error saving drawing");
    }
  };

  const downloadImage = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const imageData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageData;
      link.download = `whiteboard-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Image downloaded successfully");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className={`h-full flex flex-col`}>
      <div className="w-full h-full p-2">
        <div className="bg-white rounded-lg h-full flex flex-col gap-2">
          {/* Action Buttons - Moved to top */}
          <div className="flex justify-center gap-2 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCanvas}
              className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              <Trash2 className="w-3 h-3" />
              Clear
            </motion.button>

            {courseId && chapterId && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveDrawing}
                className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                <Save className="w-3 h-3" />
                Save
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadImage}
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download className="w-3 h-3" />
              Download
            </motion.button>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={350}
              height={450}
              className="border border-gray-200 rounded-lg shadow-sm bg-white"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>

          {/* Tools Section - Moved to bottom */}
          <div className="flex flex-wrap gap-2 justify-center pb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTool("pencil")}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm transition-all ${
                tool === "pencil"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
              }`}
            >
              <Pencil className="w-3 h-3" />
              Pencil
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTool("eraser")}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm transition-all ${
                tool === "eraser"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
              }`}
            >
              <Eraser className="w-3 h-3" />
              Eraser
            </motion.button>

            <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg">
              <label htmlFor="brushSize" className="text-gray-700 text-xs">
                Size:
              </label>
              <input
                id="brushSize"
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-16 accent-blue-600"
              />
              <span className="text-xs text-gray-600 w-4">{brushSize}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
