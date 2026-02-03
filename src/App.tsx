import { useState, useMemo } from 'react';
import './styles.css';

interface FileEntry {
  id: number;
  person: string;
  role: string;
  documentType: string;
  date: string;
  summary: string;
  classification: 'DECLASSIFIED' | 'PARTIALLY REDACTED' | 'UNSEALED';
  connections: string[];
}

const filesData: FileEntry[] = [
  {
    id: 1,
    person: "Ghislaine Maxwell",
    role: "Associate",
    documentType: "Deposition Transcript",
    date: "2016-04-22",
    summary: "Testimony regarding recruitment activities and travel logs between 1999-2005.",
    classification: "PARTIALLY REDACTED",
    connections: ["Jeffrey Epstein", "Virginia Giuffre"]
  },
  {
    id: 2,
    person: "Virginia Giuffre",
    role: "Victim/Witness",
    documentType: "Civil Complaint",
    date: "2015-01-02",
    summary: "Initial filing detailing allegations against multiple high-profile individuals.",
    classification: "UNSEALED",
    connections: ["Ghislaine Maxwell", "Prince Andrew", "Alan Dershowitz"]
  },
  {
    id: 3,
    person: "Prince Andrew",
    role: "Named Individual",
    documentType: "Flight Manifest",
    date: "2001-02-19",
    summary: "Private jet travel records documenting trips to Caribbean locations.",
    classification: "DECLASSIFIED",
    connections: ["Jeffrey Epstein", "Virginia Giuffre"]
  },
  {
    id: 4,
    person: "Alan Dershowitz",
    role: "Named Individual",
    documentType: "Legal Motion",
    date: "2015-04-07",
    summary: "Motion to intervene and strike allegations from court record.",
    classification: "UNSEALED",
    connections: ["Virginia Giuffre", "Jeffrey Epstein"]
  },
  {
    id: 5,
    person: "Bill Clinton",
    role: "Named Individual",
    documentType: "Flight Log Entry",
    date: "2002-09-21",
    summary: "Multiple entries in flight manifests for Lolita Express aircraft.",
    classification: "DECLASSIFIED",
    connections: ["Jeffrey Epstein", "Ghislaine Maxwell"]
  },
  {
    id: 6,
    person: "Jean-Luc Brunel",
    role: "Associate",
    documentType: "Witness Statement",
    date: "2019-08-12",
    summary: "Modeling agency connections and recruitment network documentation.",
    classification: "PARTIALLY REDACTED",
    connections: ["Jeffrey Epstein", "Ghislaine Maxwell"]
  },
  {
    id: 7,
    person: "Sarah Kellen",
    role: "Employee",
    documentType: "Address Book Entry",
    date: "2009-03-15",
    summary: "Personal assistant scheduling records and contact information.",
    classification: "DECLASSIFIED",
    connections: ["Jeffrey Epstein", "Ghislaine Maxwell", "Nadia Marcinkova"]
  },
  {
    id: 8,
    person: "Leslie Wexner",
    role: "Financial Associate",
    documentType: "Financial Records",
    date: "2008-06-30",
    summary: "Power of attorney documentation and property transfer records.",
    classification: "PARTIALLY REDACTED",
    connections: ["Jeffrey Epstein"]
  },
  {
    id: 9,
    person: "Nadia Marcinkova",
    role: "Named Individual",
    documentType: "Deposition Reference",
    date: "2016-05-03",
    summary: "Referenced in multiple victim depositions regarding property activities.",
    classification: "UNSEALED",
    connections: ["Jeffrey Epstein", "Sarah Kellen"]
  },
  {
    id: 10,
    person: "Donald Trump",
    role: "Named Individual",
    documentType: "Deposition Mention",
    date: "2016-04-22",
    summary: "Referenced in Maxwell deposition regarding social connections.",
    classification: "DECLASSIFIED",
    connections: ["Jeffrey Epstein", "Ghislaine Maxwell"]
  },
  {
    id: 11,
    person: "Kevin Spacey",
    role: "Named Individual",
    documentType: "Flight Record",
    date: "2002-08-22",
    summary: "Africa trip flight manifest alongside Clinton Foundation members.",
    classification: "DECLASSIFIED",
    connections: ["Jeffrey Epstein", "Bill Clinton"]
  },
  {
    id: 12,
    person: "Courtney Wild",
    role: "Victim/Witness",
    documentType: "Victim Impact Statement",
    date: "2019-07-15",
    summary: "Statement submitted during federal prosecution detailing abuse timeline.",
    classification: "UNSEALED",
    connections: ["Jeffrey Epstein", "Sarah Kellen"]
  }
];

const uniquePersons = [...new Set(filesData.map(f => f.person))].sort();
const uniqueClassifications = ['DECLASSIFIED', 'PARTIALLY REDACTED', 'UNSEALED'];
const uniqueRoles = [...new Set(filesData.map(f => f.role))].sort();

function App() {
  const [selectedPerson, setSelectedPerson] = useState<string>('');
  const [selectedClassification, setSelectedClassification] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredFiles = useMemo(() => {
    return filesData.filter(file => {
      const matchesPerson = !selectedPerson || file.person === selectedPerson;
      const matchesClassification = !selectedClassification || file.classification === selectedClassification;
      const matchesRole = !selectedRole || file.role === selectedRole;
      const matchesSearch = !searchQuery ||
        file.person.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.documentType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPerson && matchesClassification && matchesRole && matchesSearch;
    });
  }, [selectedPerson, selectedClassification, selectedRole, searchQuery]);

  const clearFilters = () => {
    setSelectedPerson('');
    setSelectedClassification('');
    setSelectedRole('');
    setSearchQuery('');
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'DECLASSIFIED': return 'classification-declassified';
      case 'PARTIALLY REDACTED': return 'classification-redacted';
      case 'UNSEALED': return 'classification-unsealed';
      default: return '';
    }
  };

  return (
    <div className="app-container">
      <div className="grain-overlay"></div>
      <div className="scanlines"></div>

      <header className="header">
        <div className="header-content">
          <div className="classified-stamp">CASE FILE</div>
          <h1 className="title">
            <span className="title-sub">THE</span>
            EPSTEIN FILES
          </h1>
          <p className="subtitle">Document Tracker & Index</p>
          <div className="header-decoration">
            <span className="case-number">CASE NO. 18-2868</span>
            <span className="divider">|</span>
            <span className="court">S.D.N.Y.</span>
          </div>
        </div>
        <div className="red-thread thread-1"></div>
        <div className="red-thread thread-2"></div>
      </header>

      <main className="main-content">
        <section className="filters-section">
          <div className="filters-header">
            <div className="folder-tab">FILTERS</div>
            <button onClick={clearFilters} className="clear-btn">
              CLEAR ALL
            </button>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">SEARCH DOCUMENTS</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter keywords..."
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">PERSON INVOLVED</label>
              <select
                value={selectedPerson}
                onChange={(e) => setSelectedPerson(e.target.value)}
                className="filter-select"
              >
                <option value="">All Persons</option>
                {uniquePersons.map(person => (
                  <option key={person} value={person}>{person}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">CLASSIFICATION</label>
              <select
                value={selectedClassification}
                onChange={(e) => setSelectedClassification(e.target.value)}
                className="filter-select"
              >
                <option value="">All Classifications</option>
                {uniqueClassifications.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">ROLE</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="filter-select"
              >
                <option value="">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="results-section">
          <div className="results-header">
            <span className="results-count">{filteredFiles.length} DOCUMENTS FOUND</span>
            <div className="results-line"></div>
          </div>

          <div className="files-grid">
            {filteredFiles.map((file, index) => (
              <article
                key={file.id}
                className={`file-card ${expandedId === file.id ? 'expanded' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setExpandedId(expandedId === file.id ? null : file.id)}
              >
                <div className="file-card-inner">
                  <div className="file-header">
                    <span className={`classification-badge ${getClassificationColor(file.classification)}`}>
                      {file.classification}
                    </span>
                    <span className="file-date">{file.date}</span>
                  </div>

                  <h3 className="file-person">{file.person}</h3>
                  <span className="file-role">{file.role}</span>

                  <div className="file-type">
                    <span className="type-icon">📄</span>
                    {file.documentType}
                  </div>

                  <p className="file-summary">{file.summary}</p>

                  {expandedId === file.id && (
                    <div className="file-connections">
                      <span className="connections-label">CONNECTED TO:</span>
                      <div className="connections-list">
                        {file.connections.map(conn => (
                          <button
                            key={conn}
                            className="connection-tag"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPerson(conn);
                            }}
                          >
                            {conn}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="file-footer">
                    <span className="expand-hint">
                      {expandedId === file.id ? '▲ COLLAPSE' : '▼ EXPAND'}
                    </span>
                  </div>
                </div>
                <div className="paper-texture"></div>
                <div className="corner-fold"></div>
              </article>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="no-results">
              <div className="redacted-block">
                <span>[REDACTED]</span>
              </div>
              <p>No documents match your current filters.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Requested by @urmomlovesbtc · Built by @clonkbot</p>
      </footer>
    </div>
  );
}

export default App;
