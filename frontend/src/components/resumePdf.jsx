import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Link } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 50,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  contactInfo: {
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  contactItem: {
    marginHorizontal: 5,
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2,
  },
  subHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  subHeadingTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  subHeadingDetail: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  subHeadingDate: {
    fontSize: 11,
  },
  itemList: {
    marginLeft: 10, // Indent for bullet points
  },
  bullet: {
    fontSize: 8, // Smaller bullet point
    marginRight: 4,
    position: 'absolute',
    left: -8,
    top: 2,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 2,
    fontSize: 10,
  },
  skillsCategory: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  skillsList: {
    fontSize: 10,
    marginBottom: 5,
  }
});

// Helper component for bullet points
const BulletItem = ({ children }) => (
  <View style={styles.listItem}>
    <Text style={styles.bullet}>•</Text>
    <Text>{children}</Text>
  </View>
);

// PDF structure
const ResumePDF = ({ resume }) => (
  <PDFViewer style={{ width: '100%', height: '100%' }}>
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ----------HEADING---------- */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.name || 'Your Name'}</Text>
          <View style={styles.contactInfo}>
            <Text>{resume.phoneNumber || '123-456-7890'}</Text>
            <Text style={{ marginHorizontal: 5 }}>|</Text>
            <Link src={`mailto:${resume.email}`} style={styles.contactItem}>{resume.email || 'your.email@example.com'}</Link>
            {resume.linkedin && (
              <>
                <Text style={{ marginHorizontal: 5 }}>|</Text>
                <Link src={resume.linkedin} style={styles.contactItem}>linkedin.com/in/{resume.linkedin.split('/').pop()}</Link>
              </>
            )}
            {resume.github && (
              <>
                <Text style={{ marginHorizontal: 5 }}>|</Text>
                <Link src={resume.github} style={styles.contactItem}>github.com/{resume.github.split('/').pop()}</Link>
              </>
            )}
          </View>
        </View>

        {/* -----------SUMMARY (repurposed from "Skills" to "Summary" for better flow)----------- */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.listItem}>{resume.summary}</Text> {/* Using listItem style for general text now */}
            
          </View>
        )}

        {/* -----------SKILLS----------- */}
        {resume.skills && Array.isArray(resume.skills) && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <Text style={styles.skillsList}>
              {resume.skills.join(", ")}
            </Text>
          </View>
        )}

        {/* -----------EXPERIENCE----------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.experience?.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.subHeading}>
                <Text style={styles.subHeadingTitle}>{exp.title}</Text>
                <Text style={styles.subHeadingDate}>{exp.years}</Text>
              </View>
              <View style={styles.subHeading}>
                <Text style={styles.subHeadingDetail}>{exp.company}</Text>
                <Text style={styles.subHeadingDate}>{exp.location}</Text>
              </View>
              {exp.description && (
                <View style={styles.itemList}>
                  {Array.isArray(exp.description) ? (
                    exp.description.map((desc, idx) => (
                      <BulletItem key={idx}>{desc}</BulletItem>
                    ))
                  ) : (
                    <BulletItem>{exp.description}</BulletItem>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* -----------EDUCATION----------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education?.map((edu, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <View style={styles.subHeading}>
                <Text style={styles.subHeadingTitle}>{edu.university}</Text>
                <Text style={styles.subHeadingDate}>{edu.years}</Text>
              </View>
              <View style={styles.subHeading}>
                <Text style={styles.subHeadingDetail}>{edu.degree}</Text>
                <Text style={styles.subHeadingDate}>{edu.location}</Text>
              </View>
              {edu.details && (
                <View style={styles.itemList}>
                  {Array.isArray(edu.details) ? (
                    edu.details.map((detail, idx) => (
                      <BulletItem key={idx}>{detail}</BulletItem>
                    ))
                  ) : (
                    <BulletItem>{edu.details}</BulletItem>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

      </Page>
    </Document>
  </PDFViewer>
);

export default ResumePDF;