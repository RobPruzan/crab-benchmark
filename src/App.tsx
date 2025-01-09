import React, { useState } from "react";

const ImageBenchmark = () => {
  const TOTAL_IMAGES = 10000;
  const [renderTime, setRenderTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [warning, setWarning] = useState(false);

  const images = Array(TOTAL_IMAGES)
    .fill(null)
    .map((_, index) => ({
      id: index,
      width: 20,
      height: 20,
    }));

  const runBenchmark = () => {
    setIsRunning(true);
    setWarning(false);
    setRenderTime(null);

    performance.clearMarks();
    performance.clearMeasures();
    performance.mark("renderStart");

    setTimeout(() => {
      performance.mark("renderEnd");
      performance.measure("renderTime", "renderStart", "renderEnd");
      const measurements = performance.getEntriesByName("renderTime");
      const time = measurements[0].duration;
      setRenderTime(time);
      setIsRunning(false);

      if (time > 1000) {
        setWarning(true);
      }
    }, 1000);
  };

  return (
    <div
      style={{
        width: "100vw",
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        padding: "1.5rem",
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          10,000 Image Benchmark
          {warning && <span style={{ color: "#ef4444" }}>⚠️</span>}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={runBenchmark}
            disabled={isRunning}
            style={{
              backgroundColor: isRunning ? "#93c5fd" : "#3b82f6",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              border: "none",
              cursor: isRunning ? "not-allowed" : "pointer",
            }}
          >
            {isRunning ? "Running..." : "Run Benchmark"}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginLeft: "1rem",
            }}
          >
            <span style={{ margin: "0 0.5rem" }}>
              Showing all {TOTAL_IMAGES} images
            </span>
          </div>
        </div>

        {renderTime && (
          <div style={{ fontSize: "1.125rem" }}>
            Render time: {renderTime.toFixed(2)}ms
            {warning && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "0.5rem",
                }}
              >
                Warning: Render time exceeds 1 second. Browser performance may
                be impacted.
              </p>
            )}
          </div>
        )}

        <div
          style={{
            display: "flex",
            width: "100vw",
            flexWrap: "wrap",
            gap: "2px"
          }}
        >
          {images.map((img) => (
            <img
              key={img.id}
              src="https://abs-0.twimg.com/emoji/v2/svg/1f980.svg"
              alt={`Test image ${img.id}`}
              style={{ width: "20px", height: "20px" }}
              loading="lazy"
              width={20}
              height={20}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageBenchmark;
