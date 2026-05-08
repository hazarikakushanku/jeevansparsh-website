"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Video, PlusCircle, Bell, LogOut, Film } from "lucide-react";
import { getAllVideos, addVideo, deleteVideo } from "@/lib/videoDB";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const [globalNotice, setGlobalNotice] = useState("");
  const [noticeSaved, setNoticeSaved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.push("/login");
      return;
    }
    setIsAdmin(true);
    setLoading(false);
    loadVideos();
    setGlobalNotice(localStorage.getItem("globalNotice") || "");
  }, []);

  const loadVideos = async () => {
    const vids = await getAllVideos();
    setVideos(vids);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    // Create a local object URL for preview
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate progress while reading the file
    const progressInterval = setInterval(() => {
      setUploadProgress((p) => Math.min(p + 15, 90));
    }, 150);

    try {
      // Read file as ArrayBuffer so it can be stored in IndexedDB
      const arrayBuffer = await file.arrayBuffer();

      clearInterval(progressInterval);
      setUploadProgress(100);

      const newVideo = {
        id: Date.now().toString(),
        title,
        description,
        blob: arrayBuffer,
        mimeType: file.type,
        createdAt: Date.now(),
      };

      await addVideo(newVideo);
      await loadVideos();

      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview(null);
      setUploadProgress(0);
      setUploading(false);
      setUploadSuccess(true);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      clearInterval(progressInterval);
      setUploading(false);
      alert("Upload failed. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    await deleteVideo(id);
    await loadVideos();
  };

  const handleSaveNotice = (e) => {
    e.preventDefault();
    localStorage.setItem("globalNotice", globalNotice);
    window.dispatchEvent(new Event("noticeUpdated"));
    setNoticeSaved(true);
    setTimeout(() => setNoticeSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  const getVideoSrc = (video) => {
    const blob = new Blob([video.blob], { type: video.mimeType });
    return URL.createObjectURL(blob);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-jeevansparsh-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-jeevansparsh-blue">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Notice Manager */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-jeevansparsh-yellow" />
            <h2 className="text-xl font-bold text-jeevansparsh-blue">Global Notice Banner</h2>
          </div>
          <form onSubmit={handleSaveNotice} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notice Text (Leave blank to hide banner)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Special Offer: 20% off all consultations this week! Call now."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jeevansparsh-blue focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                value={globalNotice}
                onChange={(e) => setGlobalNotice(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <button type="submit" className="px-6 py-3 bg-jeevansparsh-yellow text-jeevansparsh-blue rounded-xl font-bold hover:bg-yellow-400 transition-colors">
                Save Notice
              </button>
              <button
                type="button"
                onClick={() => {
                  setGlobalNotice("");
                  localStorage.removeItem("globalNotice");
                  window.dispatchEvent(new Event("noticeUpdated"));
                }}
                className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
              >
                <Trash2 size={18} /> Delete Notice
              </button>
              {noticeSaved && <span className="text-green-600 font-medium">✓ Notice updated!</span>}
            </div>
          </form>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <PlusCircle className="text-jeevansparsh-yellow" />
              <h2 className="text-xl font-bold text-jeevansparsh-blue">Upload New Video</h2>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-jeevansparsh-blue focus:ring-2 focus:ring-blue-100 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Knee Rehab Exercises"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-jeevansparsh-blue focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the video..."
                />
              </div>

              {/* File Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video File *</label>
                <label
                  htmlFor="video-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer hover:border-jeevansparsh-blue hover:bg-blue-50 transition-colors"
                >
                  <Film size={28} className="text-blue-300 mb-2" />
                  <span className="text-sm text-gray-500">
                    {file ? file.name : "Click to choose a video from your device"}
                  </span>
                  {file && (
                    <span className="text-xs text-gray-400 mt-1">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  )}
                </label>
                <input
                  id="video-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  required
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <video src={preview} controls className="w-full" preload="metadata" />
                </div>
              )}

              {/* Progress bar */}
              {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-jeevansparsh-blue h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {uploadSuccess && (
                <p className="text-green-600 font-medium text-sm text-center">✓ Video uploaded successfully!</p>
              )}

              <button
                type="submit"
                disabled={uploading || !file}
                className="w-full py-3 bg-jeevansparsh-blue text-white rounded-xl font-bold hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Upload size={18} />
                {uploading ? `Uploading ${Math.round(uploadProgress)}%` : "Upload Video"}
              </button>
            </form>
          </div>

          {/* Video List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Video className="text-jeevansparsh-blue" />
                <h2 className="text-xl font-bold text-gray-800">
                  Manage Videos ({videos.length})
                </h2>
              </div>

              {videos.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <Film size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No videos uploaded yet.</p>
                  <p className="text-gray-400 text-sm mt-1">Upload a video using the form on the left.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {videos.map((video) => (
                    <div key={video.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                      <div className="w-full sm:w-48 aspect-video bg-black rounded-lg overflow-hidden flex-shrink-0">
                        <video
                          src={getVideoSrc(video)}
                          className="w-full h-full object-cover"
                          preload="metadata"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-jeevansparsh-blue text-lg line-clamp-1">{video.title}</h3>
                          <p className="text-gray-500 text-sm line-clamp-2 mt-1">{video.description}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            Uploaded: {new Date(video.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => handleDelete(video.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
