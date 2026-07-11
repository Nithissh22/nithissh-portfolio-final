import { writeFileSync } from "node:fs";
import { join } from "node:path";

const output = join(process.cwd(), "public", "resume-nithissh-sampath-kumar.pdf");

const lines = [
  { text: "Nithissh Sampath Kumar", size: 22, y: 742 },
  { text: "AI Engineer, Full Stack Developer, and Product Builder", size: 11, y: 720 },
  { text: "B.Tech CSE (AI & ML), SRM Institute of Science and Technology | CGPA 8.29", size: 10, y: 704 },
  { text: "Profile", size: 13, y: 668 },
  { text: "Passionate AI and Machine Learning engineer focused on scalable intelligent systems,", size: 10, y: 648 },
  { text: "computer vision products, NLP workflows, and full stack applications.", size: 10, y: 634 },
  { text: "Experience", size: 13, y: 602 },
  { text: "Data Science Intern, Cognizance | June 2024 - August 2024", size: 10, y: 582 },
  { text: "Built REST APIs using FastAPI, developed React interfaces, worked with MySQL,", size: 10, y: 568 },
  { text: "and designed scalable backend architecture.", size: 10, y: 554 },
  { text: "Software Engineer Intern, Yuga Yatra Retail OPC Pvt Ltd | June 2025 - August 2025", size: 10, y: 532 },
  { text: "Projects", size: 13, y: 500 },
  { text: "EmotiSync - Emotion-aware meeting summarizer using Whisper, BERT, LangChain, FastAPI, React.", size: 10, y: 480 },
  { text: "LipSpeak - Visual speech recognition with PyTorch, LipNet, MediaPipe, FastAPI, React.", size: 10, y: 466 },
  { text: "Coral Reef Disease Detection - CNN, transfer learning, OpenCV, and Grad-CAM.", size: 10, y: 452 },
  { text: "Baby Pacifier Product Development - CAD, ANSYS, CAM, ERP, and Adobe Suite.", size: 10, y: 438 },
  { text: "Skills", size: 13, y: 404 },
  { text: "Python, C, C++, JavaScript, MySQL, React, Tailwind, FastAPI, Flask, REST APIs,", size: 10, y: 384 },
  { text: "TensorFlow, PyTorch, Computer Vision, NLP, MediaPipe, BERT, LangChain.", size: 10, y: 370 },
  { text: "Certifications", size: 13, y: 336 },
  { text: "Google Analytics; AWS Machine Learning Terminology and Process; SQL Advanced;", size: 10, y: 316 },
  { text: "Artificial Intelligence and Deep Learning Techniques; GenAI Powered Data Analytics Simulation.", size: 10, y: 302 }
];

function escapePdf(text) {
  return text.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

const content = lines
  .map(({ text, size, y }) => `BT /F1 ${size} Tf 72 ${y} Td (${escapePdf(text)}) Tj ET`)
  .join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
];

let pdf = "%PDF-1.4\n";
const offsets = [0];

objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (const offset of offsets.slice(1)) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

writeFileSync(output, pdf);
console.log(`Created ${output}`);
