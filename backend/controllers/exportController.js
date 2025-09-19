const puppeteer = require('puppeteer');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs').promises;
const path = require('path');

// Export resume to PDF
exports.exportToPDF = async (req, res) => {
  try {
    const { resumeData, template, htmlContent } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 794, height: 1123 }); // A4 size
    
    // Set content with CSS
    await page.setContent(htmlContent, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });

    await browser.close();

    // Save PDF file
    const fileName = `resume_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../exports', fileName);
    await fs.writeFile(filePath, pdfBuffer);

    res.json({
      success: true,
      fileName,
      downloadUrl: `/exports/${fileName}`,
      message: 'PDF generated successfully'
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error.message 
    });
  }
};

// Export resume to Word
exports.exportToWord = async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Header
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo?.name || 'Your Name',
                bold: true,
                size: 32,
                color: '2563eb'
              })
            ],
            heading: HeadingLevel.TITLE
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo?.title || 'Professional Title',
                size: 24,
                color: '6b7280'
              })
            ]
          }),

          // Contact Information
          new Paragraph({
            children: [
              new TextRun({
                text: `Email: ${resumeData.personalInfo?.email || 'email@example.com'} | `,
                size: 20
              }),
              new TextRun({
                text: `Phone: ${resumeData.personalInfo?.phone || '+1234567890'}`,
                size: 20
              })
            ]
          }),

          new Paragraph({ text: '' }), // Empty line

          // Summary
          ...(resumeData.summary ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'SUMMARY',
                  bold: true,
                  size: 24,
                  color: '2563eb'
                })
              ],
              heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.summary,
                  size: 22
                })
              ]
            }),
            new Paragraph({ text: '' })
          ] : []),

          // Experience
          ...(resumeData.experience?.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'EXPERIENCE',
                  bold: true,
                  size: 24,
                  color: '2563eb'
                })
              ],
              heading: HeadingLevel.HEADING_1
            }),
            ...resumeData.experience.flatMap(exp => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.title || 'Job Title',
                    bold: true,
                    size: 22
                  }),
                  new TextRun({
                    text: ` at ${exp.company || 'Company Name'}`,
                    size: 22
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.startDate || 'Start Date'} - ${exp.endDate || 'End Date'}`,
                    size: 20,
                    color: '6b7280'
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.description || 'Job description...',
                    size: 20
                  })
                ]
              }),
              new Paragraph({ text: '' })
            ]),
          ] : []),

          // Education
          ...(resumeData.education?.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'EDUCATION',
                  bold: true,
                  size: 24,
                  color: '2563eb'
                })
              ],
              heading: HeadingLevel.HEADING_1
            }),
            ...resumeData.education.flatMap(edu => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: edu.degree || 'Degree',
                    bold: true,
                    size: 22
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.school || 'School Name'} - ${edu.year || 'Year'}`,
                    size: 20,
                    color: '6b7280'
                  })
                ]
              }),
              new Paragraph({ text: '' })
            ])
          ] : []),

          // Skills
          ...(resumeData.skills?.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'SKILLS',
                  bold: true,
                  size: 24,
                  color: '2563eb'
                })
              ],
              heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.skills.join(', '),
                  size: 20
                })
              ]
            })
          ] : [])
        ]
      }]
    });

    const buffer = await Packer.toBuffer(doc);

    // Save Word file
    const fileName = `resume_${Date.now()}.docx`;
    const filePath = path.join(__dirname, '../exports', fileName);
    await fs.writeFile(filePath, buffer);

    res.json({
      success: true,
      fileName,
      downloadUrl: `/exports/${fileName}`,
      message: 'Word document generated successfully'
    });

  } catch (error) {
    console.error('Word generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate Word document',
      details: error.message 
    });
  }
};