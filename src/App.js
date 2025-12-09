import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Shuffle,
  CheckCircle2,
  BookOpen,
  Layers,
} from "lucide-react";

const FlashcardApp = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState("all"); // 'lecture1' to 'lecture12', 'all'
  const [activeCards, setActiveCards] = useState([]);

  // Data for Lecture 1
  const lecture1Data = [
    {
      id: "l1-1",
      topic: "SE Definition",
      question: "What is Software Engineering (SE) concerned with?",
      answer:
        "Theories, methods, and tools for professional software development that is cost-effective and produces high-quality software. It covers hardware, software, and process engineering.",
    },
    {
      id: "l1-2",
      topic: "DevOps",
      question: "What is DevOps?",
      answer:
        "A set of practices combining software development (Dev) and operations (Ops) that promotes collaboration between teams to make development more efficient.",
    },
    {
      id: "l1-3",
      topic: "Full Stack",
      question: "Define Front-End, Back-End, and Full Stack.",
      answer:
        "Front-End: Client-side (HTML, CSS, JS). \nBack-End: Server-side (processing requests, databases like PHP, Python, SQL). \nFull Stack: Development of both front and back ends.",
    },
    {
      id: "l1-4",
      topic: "Full Stack",
      question: "What characterizes a Full-stack developer?",
      answer:
        "Someone who can play any role in SW development. They should know design, Front-End technologies, Back-End languages, databases, and infrastructures.",
    },
    {
      id: "l1-5",
      topic: "Software Products",
      question: "What are the 3 types of Software Products?",
      answer:
        "1. Generic product: Stand-alone, marketed to any customer (e.g., graphics programs).\n2. Customised product: Specific customer with specific needs (e.g., traffic monitoring).\n3. Online services: (e.g., Google services).",
    },
    {
      id: "l1-6",
      topic: "SW Process",
      question: "What are the 5 structured activities of the Software Process?",
      answer:
        "1. Requirements specification\n2. Analysis and design (refining requirements)\n3. Implementation (development)\n4. Validation and verification (checking customer needs)\n5. Evolution (modification/service)",
    },
    {
      id: "l1-7",
      topic: "Cognitive Mechanism",
      question: "What is the formula for the 'Cognitive Mechanism'?",
      answer: "Cognitive Mechanism = Chunking + Hierarchies + Schemata",
    },
    {
      id: "l1-8",
      topic: "Architecture",
      question: "What are the components of a 'Well-formed architecture'?",
      answer:
        "Well-formed architecture = Modularity + Hierarchical Layering + Pattern consistency",
    },
    {
      id: "l1-9",
      topic: "System Perspectives",
      question: "Describe the 'External' System Perspective.",
      answer:
        "View from the point of view of a client, defining system boundaries and environment.\nDiagram: Use Case Diagram.",
    },
    {
      id: "l1-10",
      topic: "System Perspectives",
      question: "Describe the 'Structural' System Perspective.",
      answer:
        "Models the organization of the system and data.\nDiagrams: Class, Object, Deployment, Package, Component Diagrams.",
    },
    {
      id: "l1-11",
      topic: "System Perspectives",
      question: "Describe the 'Interaction' System Perspective.",
      answer:
        "Interaction between the system, its parts, and its environment.\nDiagrams: Sequence Diagram, ERD.",
    },
    {
      id: "l1-12",
      topic: "System Perspectives",
      question: "Describe the 'Behavioural' System Perspective.",
      answer:
        "Behavior of the system and its elements and how it responds to events.\nDiagrams: Activity Diagram, State Diagram.",
    },
    {
      id: "l1-13",
      topic: "Requirements",
      question:
        "What is the difference between Functional and Non-functional requirements?",
      answer:
        "Functional: Statements of services the system provides and how it behaves (e.g., 'user shall search lists').\nNon-functional: Properties and constraints like timing, security, reliability (e.g., 'system shall be available 99% of time').",
    },
    {
      id: "l1-14",
      topic: "Use Case Diagrams",
      question: "What is the primary purpose of a Use Case Diagram?",
      answer:
        "To identify and establish system requirements, focusing ONLY on functional requirements.",
    },
    {
      id: "l1-15",
      topic: "Use Case Diagrams",
      question: "What are the 3 main components of a Use Case Diagram?",
      answer: "1. Actors\n2. Use Cases\n3. System Boundary (Subject)",
    },
    {
      id: "l1-16",
      topic: "Use Case Diagrams",
      question: "Define 'Actor' in a Use Case Diagram.",
      answer:
        "An external entity that interacts directly with the system. \nPrimary Actor: Triggers the use case.\nSecondary Actor: Interacts with the use case in some way.",
    },
    {
      id: "l1-17",
      topic: "Use Case Diagrams",
      question: "What is the 'Main Flow' in a Use Case?",
      answer:
        "The flow of events listing steps in a use case. It represents the 'Happy Day Scenario' where everything goes as expected.",
    },
    {
      id: "l1-18",
      topic: "Use Case Diagrams",
      question: "What is Actor Generalisation?",
      answer:
        "When two actors share a sub-role so they communicate with the same use cases (e.g., 'Staff' generalizes 'Manager' and 'Cashier').",
    },
    {
      id: "l1-19",
      topic: "Use Case Diagrams",
      question: "What is Use Case Generalisation?",
      answer:
        "When a child use case is a more specific form of the parent (e.g., 'FindProduct' is parent to 'FindBook' and 'FindCD').",
    },
    {
      id: "l1-20",
      topic: "Use Case Diagrams",
      question: "Explain the <<include>> relationship.",
      answer:
        "A ---(include)---> B\nThe base use case (A) is NOT complete without the included use case (B). It specifies a fragment of behavior that is always executed.",
    },
    {
      id: "l1-21",
      topic: "Use Case Diagrams",
      question: "Explain the <<extend>> relationship.",
      answer:
        "A <---(extend)--- B\nThe base use case (A) IS complete on its own. The extending use case (B) inserts behavior only at specific extension points (e.g., based on a condition).",
    },
  ];

  // Data for Lecture 2
  const lecture2Data = [
    {
      id: "l2-1",
      topic: "Requirements Engineering",
      question: "What is Requirements Engineering?",
      answer: "The process of establishing requirements for a system.",
    },
    {
      id: "l2-2",
      topic: "Requirements Quality",
      question: "What are the 5 criteria for Requirements Quality?",
      answer:
        "1. Complete (all required functions included)\n2. Consistent (no conflicts)\n3. Precision (only one interpretation)\n4. Verifiable (can be checked)\n5. Realistic (implementable)",
    },
    {
      id: "l2-3",
      topic: "Requirements Engineering",
      question: "What are the stages of the Requirements Engineering Process?",
      answer:
        "1. Requirements discovery\n2. Classification and prioritization\n3. Specification (Natural language, graphical, math)\n4. Verification and validation (reviews, testing)\n5. Management and evolution",
    },
    {
      id: "l2-4",
      topic: "Non-functional Reqs",
      question: "What are the 3 categories of Non-functional Requirements?",
      answer:
        "1. Product requirements (quality like speed, reliability)\n2. Organisational requirements (policies, implementation)\n3. External requirements (legislative, external factors)",
    },
    {
      id: "l2-5",
      topic: "Product Reqs",
      question: "List the main Product Requirements.",
      answer:
        "1. Dependability (availability, reliability, safety & security)\n2. Efficiency (performance and space)\n3. Usability\n4. Modifiability (robustness, portability, reusability, etc.)",
    },
    {
      id: "l2-6",
      topic: "Dependability",
      question: "Define 'Availability' in terms of Dependability.",
      answer:
        "The ability to deliver services when requested (how long the system operates without failure).",
    },
    {
      id: "l2-7",
      topic: "Dependability",
      question: "Define 'Reliability' in terms of Dependability.",
      answer:
        "Delivering services as specified (includes error detection, frequency of errors, and handling).",
    },
    {
      id: "l2-8",
      topic: "Dependability",
      question: "Define 'Safety' in terms of Dependability.",
      answer:
        "Operating without catastrophic failure or damage to the environment (preventing injury or death).",
    },
    {
      id: "l2-9",
      topic: "Security",
      question: "What are the 3 pillars of Security?",
      answer:
        "1. Confidentiality (no unauthorized disclosure)\n2. Integrity (data not corrupted)\n3. Availability (data accessible to authorized users)",
    },
    {
      id: "l2-10",
      topic: "Activity Diagrams",
      question: "What is the purpose of a UML Activity Diagram?",
      answer:
        "To model the behavior of use cases, collaborations of classes, components, people, and methods.",
    },
    {
      id: "l2-11",
      topic: "Activity Nodes",
      question:
        "Describe the symbols for Initial and Final nodes in an Activity Diagram.",
      answer:
        "Initial Node: A solid black dot.\nActivity Final Node: A black dot with a white edge (bullseye).",
    },
    {
      id: "l2-12",
      topic: "Activity Nodes",
      question: "What is an Action Node?",
      answer:
        "A rectangle with rounded edges representing an atomic unit of work in the activity.",
    },
    {
      id: "l2-13",
      topic: "Activity Nodes",
      question: "What is a Decision Node vs. a Merge Node?",
      answer:
        "Both are diamonds.\nDecision Node: One input, 2+ outputs guarded by conditions (branches flow).\nMerge Node: Multiple inputs, one output (merges alternate flows).",
    },
    {
      id: "l2-14",
      topic: "Activity Nodes",
      question: "What are Fork and Join nodes used for?",
      answer:
        "Fork Node: Splits flow into multiple concurrent flows (parallel).\nJoin Node: Synchronizes multiple concurrent flows into one.",
    },
    {
      id: "l2-15",
      topic: "Token Game",
      question: "Explain the 'Token Game' concept.",
      answer:
        "A way to visualize execution: An Action node executes when it has a token on ALL input edges. Upon finishing, it offers a token on ALL output edges.",
    },
    {
      id: "l2-16",
      topic: "Action Types",
      question: "What is a 'Call Action' node?",
      answer:
        "Invokes an activity, behavior, or operation. It is the most common type of action node.",
    },
    {
      id: "l2-17",
      topic: "Action Types",
      question: "What is a 'Send Signal' action?",
      answer:
        "Sends a signal asynchronously. The sender DOES NOT wait for confirmation of receipt.",
    },
    {
      id: "l2-18",
      topic: "Action Types",
      question: "What is an 'Accept Event' action?",
      answer:
        "Waits for an event detected by its owning object. It is enabled when it gets a token; if it has no input edge, it is always enabled.",
    },
    {
      id: "l2-19",
      topic: "Action Types",
      question: "What is an 'Accept Time Event' action?",
      answer:
        "Waits for a set amount of time or for a specific time expression (symbolized by an hourglass).",
    },
    {
      id: "l2-20",
      topic: "Guard Condition",
      question: "What is a Guard Condition?",
      answer:
        "A boolean expression enclosed in square brackets `[ ]` placed on a transition edge, which must be true for the token to traverse that edge.",
    },
  ];

  // Data for Lecture 3
  const lecture3Data = [
    {
      id: "l3-1",
      topic: "Development Stages",
      question: "Define Analysis, Design, and Implementation.",
      answer:
        "Analysis: Identifying processes, entities, and relationships (Problem Domain).\nDesign: Refining models with implementation details (Solution Domain).\nImplementation: Realizing the design as a program.",
    },
    {
      id: "l3-2",
      topic: "Architecture",
      question:
        "Distinguish between 'Architecture in the small' and 'Architecture in the large'.",
      answer:
        "In the small: Architecture of individual programs (Analysis).\nIn the large: Architecture of complex enterprise systems including other systems/components (Design).",
    },
    {
      id: "l3-3",
      topic: "Design Models",
      question:
        "What is the difference between Static and Dynamic design models?",
      answer:
        "Static: Describes structure (entities, relationships). E.g., Class, Component diagrams.\nDynamic: Describes interactions/behavior. E.g., Activity, Sequence diagrams.",
    },
    {
      id: "l3-4",
      topic: "Fundamental Views",
      question: "What are the 3 Fundamental Views of software systems?",
      answer:
        "1. Function-oriented (set of interacting functions)\n2. Data-oriented (data structures are primary)\n3. Object-oriented (interacting objects encapsulating data and operations)",
    },
    {
      id: "l3-5",
      topic: "Structured Analysis",
      question: "What are the core notations of Structured Analysis?",
      answer:
        "1. Context Diagram (System boundary)\n2. Data Flow Diagram (DFD)\n3. Entity-Relationship Diagram (ERD)\n4. State Diagram (STD)",
    },
    {
      id: "l3-6",
      topic: "Analysis Comparison",
      question:
        "Compare Structured vs. Object-Oriented Analysis for System Boundary.",
      answer:
        "Structured: Context Diagram.\nObject-Oriented: Use Case Diagram.",
    },
    {
      id: "l3-7",
      topic: "Objects",
      question: "What are the 3 characteristics of an Object?",
      answer:
        "1. Identity (unique handle)\n2. State (data values)\n3. Behaviour (set of operations)",
    },
    {
      id: "l3-8",
      topic: "Class vs Object",
      question: "What is the difference between a Class and an Object?",
      answer:
        "A Class acts as a template defining common features (type). An Object is a specific instance of a class with actual data values.",
    },
    {
      id: "l3-9",
      topic: "Links vs Associations",
      question: "Explain the relationship between Links and Associations.",
      answer:
        "A Link is a connection between objects (instance). An Association is a relationship between classes. A link is an instance of an association.",
    },
    {
      id: "l3-10",
      topic: "Class Notation",
      question:
        "In UML Class notation, how do Analytical and Design classes differ?",
      answer:
        "Analytical classes are high-level (attributes, key services). Design classes are detailed (visibility, types, initial values, parameters, constructors).",
    },
    {
      id: "l3-11",
      topic: "Analysis Class Qualities",
      question: "What are 3 qualities of a good Analysis Class?",
      answer:
        "1. Crisp abstraction (models one specific element)\n2. High cohesion (models a single abstraction well)\n3. Low coupling (low dependence on other classes)",
    },
    {
      id: "l3-12",
      topic: "Associations",
      question: "What does 'Navigability' indicate in an association?",
      answer:
        "It indicates if it is possible to traverse from the object of a source class to the object of a target class (shown by arrowheads).",
    },
    {
      id: "l3-13",
      topic: "Associations",
      question: "What is a 'Reflective Association'?",
      answer:
        "An association where a class is associated with itself (e.g., a Directory containing Subdirectories).",
    },
    {
      id: "l3-14",
      topic: "Associations",
      question: "What is an 'Association Class'?",
      answer:
        "A class that is part of an association itself, containing data related to the relationship (e.g., 'Job' between 'Company' and 'Person' holding 'salary').",
    },
    {
      id: "l3-15",
      topic: "Dependency",
      question: "What is a Dependency relationship?",
      answer:
        "A relationship where a change to one element (supplier) may affect another (client). Types: Usage, Abstraction, Permission.",
    },
    {
      id: "l3-16",
      topic: "Generalisation",
      question: "What is Generalisation?",
      answer:
        "A relationship between a general element (superclass) and a specific element (subclass). The subclass inherits attributes, operations, and relationships.",
    },
    {
      id: "l3-17",
      topic: "Operations",
      question: "What is a Polymorphic Operation?",
      answer:
        "An operation that has many implementations (e.g., overridden in subclasses).",
    },
    {
      id: "l3-18",
      topic: "CRC Cards",
      question: "What is CRC card analysis?",
      answer:
        "A method for finding classes by identifying: Class, Responsibilities, and Collaborators.",
    },
  ];

  // Data for Lecture 4
  const lecture4Data = [
    {
      id: "l4-1",
      topic: "Process Models",
      question: "What is the Waterfall Model?",
      answer:
        "A plan-driven model with fixed stages (Requirements, Analysis, Design, Implementation, Testing) suitable for large or stable projects.",
    },
    {
      id: "l4-2",
      topic: "Process Models",
      question: "What is Incremental Development?",
      answer:
        "An approach where specification, development, and validation are interleaved. The system is developed in increments, with user requirements prioritized.",
    },
    {
      id: "l4-3",
      topic: "Process Models",
      question: "What is Reuse-oriented Software Engineering?",
      answer:
        "A process based on systematic reuse where the system is integrated/assembled from existing components (now standard in business).",
    },
    {
      id: "l4-4",
      topic: "Plan-driven vs Agile",
      question: "Differentiate Plan-driven vs Agile development.",
      answer:
        "Plan-driven: Separate stages planned in advance.\nAgile: Processes decided through negotiation during development, focusing on rapid delivery and change.",
    },
    {
      id: "l4-5",
      topic: "Spiral Model",
      question: "Describe Boehm's Spiral Model.",
      answer:
        "A risk-driven process without fixed stages, represented as a spiral. Sectors: Objective setting, Risk assessment, Development/Validation, Planning.",
    },
    {
      id: "l4-6",
      topic: "Agile Principles",
      question: "What are the key Agile Principles?",
      answer:
        "1. Customer involvement\n2. Incremental delivery\n3. People not process\n4. Embrace change\n5. Maintain simplicity",
    },
    {
      id: "l4-7",
      topic: "Agile",
      question: "What are the benefits and problems of Agile?",
      answer:
        "Benefits: Flexibility, customer satisfaction, early feedback.\nProblems: Hard to keep customer interest, lack of documentation, hard to measure progress.",
    },
    {
      id: "l4-8",
      topic: "Scrum",
      question: "What is Scrum?",
      answer:
        "An agile framework with roles, events, and artifacts to help teams structure work.",
    },
    {
      id: "l4-9",
      topic: "Scrum",
      question: "What are the main Scrum Ceremonies?",
      answer:
        "1. Sprint (development unit)\n2. Sprint Planning\n3. Daily Scrum (Stand-up)\n4. Sprint Review\n5. Sprint Retrospective",
    },
    {
      id: "l4-10",
      topic: "Scrum",
      question: "What are the 3 main Scrum Roles?",
      answer:
        "1. Product Owner (voice of customer, priorities)\n2. Scrum Master (ensures process is followed)\n3. Team (does the work)",
    },
    {
      id: "l4-11",
      topic: "User Stories",
      question: "What is the format of a User Story?",
      answer: "'As a <type of user>, I want <goal> so that <reason>.'",
    },
    {
      id: "l4-12",
      topic: "Backlog",
      question: "Difference between Product Backlog and Sprint Backlog?",
      answer:
        "Product Backlog: List of ALL desired work/requirements.\nSprint Backlog: List of tasks selected specifically for the current Sprint.",
    },
    {
      id: "l4-13",
      topic: "Extreme Programming",
      question: "What distinguishes Extreme Programming (XP)?",
      answer:
        "Practices like Pair Programming and Test-Driven Development (TDD).",
    },
    {
      id: "l4-14",
      topic: "State Machine",
      question: "What does a State Machine model?",
      answer:
        "The life stages of a single model element (object, use case) as a progression of states, transitions, and events.",
    },
    {
      id: "l4-15",
      topic: "State Machine",
      question: "What are the two types of State Machines?",
      answer:
        "1. Behavioural: Defines behavior of a model element.\n2. Protocol: Models the protocol (legal sequences) of a classifier.",
    },
    {
      id: "l4-16",
      topic: "State vs Action",
      question: "Define 'State', 'Action', and 'Activity' in a State Machine.",
      answer:
        "State: A condition/situation.\nAction: Instantaneous, uninterruptible (entry/exit).\nActivity: Takes time, interruptible (do/).",
    },
    {
      id: "l4-17",
      topic: "Transitions",
      question: "What triggers a Transition in a State Machine?",
      answer: "An Event. (Can also have Guard Conditions that must be true).",
    },
    {
      id: "l4-18",
      topic: "Events",
      question: "List 4 types of Events in State Machines.",
      answer:
        "1. Call event (operation call)\n2. Signal event (asynchronous signal)\n3. Change event (condition becomes true)\n4. Time event (time passes, 'after', 'when')",
    },
    {
      id: "l4-19",
      topic: "Composite State",
      question: "What is a Composite State?",
      answer:
        "A state that contains nested submachines or regions (can be orthogonal/concurrent).",
    },
    {
      id: "l4-20",
      topic: "Pseudo States",
      question: "What are Choice and Junction pseudo states?",
      answer:
        "Choice: Dynamic branch (decision made at runtime).\nJunction: Static branch (chains transitions together).",
    },
  ];

  // Data for Lecture 5
  const lecture5Data = [
    {
      id: "l5-1",
      topic: "Data",
      question:
        "What is the difference between Analog and Digital information?",
      answer:
        "Digital information is converted into binary form and DOES NOT deteriorate over time like analog information.",
    },
    {
      id: "l5-2",
      topic: "Big Data",
      question: "What are the '5 V's' of Big Data?",
      answer:
        "1. Volume (size)\n2. Variety (different types)\n3. Veracity (validated/accurate)\n4. Value (useful)\n5. Velocity (generated fast)",
    },
    {
      id: "l5-3",
      topic: "Relational DB",
      question: "What defines a Relational Database?",
      answer:
        "Data stored in 2D tables (rows/columns) with pre-defined relationships. Each row has a unique key. (e.g., MySQL, PostgreSQL).",
    },
    {
      id: "l5-4",
      topic: "NoSQL",
      question: "List the 4 main types of NoSQL databases.",
      answer:
        "1. Key-Value\n2. Column-Based (Column-family)\n3. Document Database\n4. Graph Database",
    },
    {
      id: "l5-5",
      topic: "NoSQL",
      question: "Describe Key-Value and Document databases.",
      answer:
        "Key-Value: Dictionary/Hash map structure (e.g., shopping carts).\nDocument: Stores data in JSON/XML/text, flexible structure (e.g., user profiles).",
    },
    {
      id: "l5-6",
      topic: "NoSQL",
      question: "What is a Graph Database used for?",
      answer:
        "Stores nodes (entities) and edges (relationships). Best for social networks and fraud detection.",
    },
    {
      id: "l5-7",
      topic: "Data Management",
      question: "What is Data Governance?",
      answer:
        "Principles and practices ensuring high quality, correctness, security, and discoverability of data throughout its lifecycle.",
    },
    {
      id: "l5-8",
      topic: "ER Modelling",
      question:
        "What are the 3 main components of an ERD (Entity-Relationship Diagram)?",
      answer:
        "1. Entities (Rectangle)\n2. Relationships (Diamond)\n3. Attributes (Oval)",
    },
    {
      id: "l5-9",
      topic: "ER Modelling",
      question: "What is the Cardinality Ratio?",
      answer:
        "It describes the number of entities that can participate in a relationship (1:1, 1:N, M:N).",
    },
    {
      id: "l5-10",
      topic: "Keys",
      question: "Define Superkey, Candidate Key, and Primary Key.",
      answer:
        "Superkey: Set of attributes uniquely identifying an entity.\nCandidate Key: Non-redundant superkey.\nPrimary Key: The selected candidate key.",
    },
    {
      id: "l5-11",
      topic: "Keys",
      question: "What is a Foreign Key?",
      answer:
        "A set of attributes in one entity that uniquely identifies another entity (links tables).",
    },
    {
      id: "l5-12",
      topic: "Normalization",
      question: "What are the goals of Data Normalization?",
      answer:
        "1. Minimize redundancy and dependency.\n2. Remove anomalies (Update, Insertion, Deletion).",
    },
    {
      id: "l5-13",
      topic: "Normalization",
      question: "Define 1st Normal Form (1NF).",
      answer:
        "Domain of each attribute contains only atomic values (single value per cell). No repeating groups.",
    },
    {
      id: "l5-14",
      topic: "Normalization",
      question: "Define 2nd Normal Form (2NF).",
      answer:
        "Must be in 1NF AND no non-prime attribute is dependent on a PROPER SUBSET of any candidate key (No partial dependency).",
    },
    {
      id: "l5-15",
      topic: "Normalization",
      question: "Define 3rd Normal Form (3NF).",
      answer:
        "Must be in 2NF AND non-prime attributes are non-transitively dependent on the candidate key (No transitive dependency).",
    },
    {
      id: "l5-16",
      topic: "Dependencies",
      question: "What is Functional Dependency?",
      answer:
        "Y is functionally dependent on X if each X value is associated with precisely one Y value (X determines Y).",
    },
  ];

  // Data for Lecture 6
  const lecture6Data = [
    {
      id: "l6-1",
      topic: "System Design",
      question: "What is System Design?",
      answer:
        "Refines how functions are implemented and how non-functional requirements are ensured. Quality-driven design decisions are called 'tactics'.",
    },
    {
      id: "l6-2",
      topic: "Dependability",
      question: "What is Fault Avoidance?",
      answer:
        "Organizing the process to detect/repair faults BEFORE delivery (using Verification & Validation techniques).",
    },
    {
      id: "l6-3",
      topic: "Dependability",
      question: "What is Fault Detection vs Fault Tolerance?",
      answer:
        "Detection: Run-time techniques to spot failures (Monitoring, Heartbeat).\nTolerance: System keeps operating despite faults (Redundancy, Recovery).",
    },
    {
      id: "l6-4",
      topic: "Dependability",
      question: "Explain Redundancy vs. Diversity.",
      answer:
        "Redundancy: >1 version of a critical component (Backup).\nDiversity: Implementing same function in DIFFERENT ways to avoid common failures.",
    },
    {
      id: "l6-5",
      topic: "Dependability",
      question: "What is N-version programming?",
      answer:
        "Multiple versions of a software system carrying out computations at the same time (voting on the result).",
    },
    {
      id: "l6-6",
      topic: "Security",
      question: "What are the two main Design for Security strategies?",
      answer:
        "1. Protection: Organizing system to protect critical assets (Platform, Application, Record levels).\n2. Distribution: Distributing assets so attacks don't destroy everything.",
    },
    {
      id: "l6-7",
      topic: "Security",
      question: "List 3 Security Guidelines.",
      answer:
        "1. Fail securely (no sensitive info leakage).\n2. Principle of least privilege (access only what's needed).\n3. Compartmentalize assets.",
    },
    {
      id: "l6-8",
      topic: "Survivability",
      question: "What are the 3 stages of System Survivability?",
      answer:
        "1. Resistance (avoid problems).\n2. Recognition (detect attacks).\n3. Recovery (restore services).",
    },
    {
      id: "l6-9",
      topic: "Performance",
      question: "What are 3 Performance Tactics?",
      answer:
        "1. Introduce concurrency (parallel processing).\n2. Control resource use.\n3. Increase available resources.",
    },
    {
      id: "l6-10",
      topic: "Modifiability",
      question: "What is a 'Ripple Effect'?",
      answer:
        "When a modification to one module necessitates changes in other modules not directly affected.",
    },
    {
      id: "l6-11",
      topic: "Modifiability",
      question: "What are tactics for Modifiability?",
      answer:
        "Information Hiding (encapsulation), Polymorphism (late binding), Runtime registration, Configuration files.",
    },
    {
      id: "l6-12",
      topic: "Usability",
      question: "What is a key Usability Tactic?",
      answer:
        "Separate the User Interface from the rest of the application (e.g., MVC pattern).",
    },
    {
      id: "l6-13",
      topic: "Quality Conflicts",
      question: "Can all quality attributes be optimized simultaneously?",
      answer:
        "No. High security might reduce usability or performance. Trade-offs must be made based on a quality plan.",
    },
    {
      id: "l6-14",
      topic: "Design Class",
      question:
        "What does a Design Class usually include that an Analysis Class doesn't?",
      answer:
        "Complete operations (parameters, return types), visibility, constructors, and specific data types.",
    },
    {
      id: "l6-15",
      topic: "Relationships",
      question: "Distinguish between Aggregation and Composition.",
      answer:
        "Aggregation: 'Whole-part', parts can exist independently (white diamond).\nComposition: Strong ownership, parts die with the whole (black diamond).",
    },
  ];

  // Data for Lecture 7
  const lecture7Data = [
    {
      id: "l7-1",
      topic: "Low-level Design",
      question: "What is Low-level Design?",
      answer:
        "Includes all code-level details and decides exactly how the system shall be implemented. Techniques include Design patterns, SOLID principles, and refactoring.",
    },
    {
      id: "l7-2",
      topic: "Design Pattern",
      question: "What is a Design Pattern?",
      answer:
        "A reusable template for a solution to a common problem in a specific context. It describes the problem and the essence of the solution (not code).",
    },
    {
      id: "l7-3",
      topic: "Observer Pattern",
      question: "What is the Observer Pattern?",
      answer:
        "A pattern that separates the display of the state from the object itself. Useful when multiple displays/observers need to be updated when a Subject changes.",
    },
    {
      id: "l7-4",
      topic: "SOLID",
      question: "What do the 'S' and 'O' stand for in SOLID?",
      answer:
        "S: Single Responsibility (one reason to change).\nO: Open/Closed (Open for extension, Closed for modification).",
    },
    {
      id: "l7-5",
      topic: "SOLID",
      question: "Explain the Liskov Substitution Principle (L).",
      answer:
        "Subtypes must be substitutable for their base types without altering the correctness of the program (Derived classes must behave like their base classes).",
    },
    {
      id: "l7-6",
      topic: "SOLID",
      question: "What do 'I' and 'D' stand for in SOLID?",
      answer:
        "I: Interface Segregation (Clients shouldn't depend on methods they don't use).\nD: Dependency Inversion (Depend on abstractions, not concretions).",
    },
    {
      id: "l7-7",
      topic: "Programming Guidelines",
      question: "List 3 Programming Guidelines for Dependability.",
      answer:
        "1. Limit visibility of information (private data).\n2. Check all inputs for validity.\n3. Provide handlers for all exceptions.",
    },
    {
      id: "l7-8",
      topic: "Reuse",
      question: "What are the 4 Levels of Reuse?",
      answer:
        "1. Object level (libraries)\n2. Component level (collections of objects)\n3. System level (reusing entire apps)\n4. Abstraction level (reusing knowledge/patterns)",
    },
    {
      id: "l7-9",
      topic: "Configuration Management",
      question: "What are the 3 activities of Configuration Management?",
      answer:
        "1. Version management (tracking versions)\n2. System integration (building versions)\n3. Problem tracking (bug reporting)",
    },
    {
      id: "l7-10",
      topic: "Interaction Diagrams",
      question: "Compare Sequence Diagrams vs. Communication Diagrams.",
      answer:
        "Sequence: Emphasizes time-ordered sequence of messages.\nCommunication: Emphasizes structural relationships (links) between objects.",
    },
    {
      id: "l7-11",
      topic: "Sequence Diagrams",
      question: "What are Lifelines and Messages?",
      answer:
        "Lifeline: Represents a participant (vertical line).\nMessage: Communication between lifelines (Synch, Asynch, Return, Create, Destroy).",
    },
    {
      id: "l7-12",
      topic: "Sequence Fragments",
      question: "What are 'opt' and 'alt' fragments in Sequence Diagrams?",
      answer:
        "opt: Single operand, executes if condition is true (if).\nalt: Two or more operands, only one executes based on condition (if...else).",
    },
    {
      id: "l7-13",
      topic: "Sequence Fragments",
      question: "What is a 'loop' fragment?",
      answer:
        "Represents repetitive execution. Can specify min/max iterations or a boolean guard condition.",
    },
  ];

  // Data for Lecture 8
  const lecture8Data = [
    {
      id: "l8-1",
      topic: "SW Architecture",
      question: "What is Software Architecture?",
      answer:
        "A set of significant design decisions that shape a software system, where significance is measured by the cost of change.",
    },
    {
      id: "l8-2",
      topic: "4+1 Views",
      question: "What are the 5 views in the 4+1 View Model?",
      answer:
        "1. Logical view (objects/classes)\n2. Process view (run-time interactions)\n3. Development view (decomposition)\n4. Physical view (hardware mapping)\n5. Scenarios/Use cases (unifying view)",
    },
    {
      id: "l8-3",
      topic: "Patterns",
      question: "What is the MVC Pattern?",
      answer:
        "Model-View-Controller. Separates presentation (View), interaction (Controller), and data/logic (Model).",
    },
    {
      id: "l8-4",
      topic: "Patterns",
      question: "What is Layered Architecture?",
      answer:
        "Organizes the system into a set of layers with interfaces. Supports incremental development (e.g., UI, Logic, DB layers).",
    },
    {
      id: "l8-5",
      topic: "Patterns",
      question: "What is the Pipe and Filter Pattern?",
      answer:
        "Functional transformations process their inputs to produce outputs. (Sequential transformations = batch sequential model).",
    },
    {
      id: "l8-6",
      topic: "Patterns",
      question: "What is the Repository Architecture Pattern?",
      answer:
        "Used when large amounts of data are to be shared among subsystems (centralized data).",
    },
    {
      id: "l8-7",
      topic: "Application Types",
      question: "What are Transaction Processing Applications?",
      answer:
        "Data-centered applications that process user requests and update information in a system database (e.g., E-commerce, Banking).",
    },
    {
      id: "l8-8",
      topic: "SOA",
      question: "What is Service-Oriented Architecture (SOA)?",
      answer:
        "Developing distributed systems where components are stand-alone services, often executing on different computers.",
    },
    {
      id: "l8-9",
      topic: "Microservices",
      question: "What is Microservice Architecture?",
      answer:
        "An application as a collection of multiple small independent services. Simpler to understand, scale, and deploy.",
    },
    {
      id: "l8-10",
      topic: "Packages",
      question: "What is a Package?",
      answer:
        "A general-purpose mechanism for organizing model elements (grouping). It defines an encapsulated namespace.",
    },
    {
      id: "l8-11",
      topic: "Components",
      question: "What is a Component?",
      answer:
        "A modular, replaceable part of a system that encapsulates its contents. Can be Physical (EJB) or Logical (Subsystem).",
    },
    {
      id: "l8-12",
      topic: "Components",
      question: "What is a Port?",
      answer:
        "Specifies an interaction point between a classifier (component) and its environment.",
    },
    {
      id: "l8-13",
      topic: "Deployment",
      question: "What does a Deployment Diagram model?",
      answer:
        "The system's physical architecture (Nodes) and the mapping of software artifacts to those nodes.",
    },
  ];

  // Data for Lecture 9
  const lecture9Data = [
    {
      id: "l9-1",
      topic: "Quality Assurance",
      question: "What is the difference between QA and QC?",
      answer:
        "QA (Quality Assurance): Process-driven approach to prevent defects.\nQC (Quality Control): Product-driven approach to identify defects.",
    },
    {
      id: "l9-2",
      topic: "Testing Goals",
      question: "Differentiate between Validation Testing and Defect Testing.",
      answer:
        "Validation: 'Are we building the right product?' (Meets customer requirements).\nDefect: 'Are we building the product right?' (Discovering bugs/faults).",
    },
    {
      id: "l9-3",
      topic: "Verification",
      question:
        "What is the difference between Static and Dynamic Verification?",
      answer:
        "Static: Analyzing the system representation without execution (Inspections).\nDynamic: Exercising/running the product to observe behavior (Testing).",
    },
    {
      id: "l9-4",
      topic: "Inspections",
      question: "What are Software Inspections?",
      answer:
        "People examining source code to discover anomalies and defects. Can find errors that testing might mask.",
    },
    {
      id: "l9-5",
      topic: "Static Analysis",
      question: "What is Automated Static Analysis?",
      answer:
        "Using tools to scan source code for patterns characteristic of errors (e.g., uninitialized variables) without running it.",
    },
    {
      id: "l9-6",
      topic: "Formal Methods",
      question: "What are Formal Methods and Model Checking?",
      answer:
        "Mathematical specifications of a system. Model checking explores all possible states (finite state model) to find errors like deadlocks.",
    },
    {
      id: "l9-7",
      topic: "Dev Testing",
      question: "What are the 3 stages of Development Testing?",
      answer:
        "1. Unit testing (individual objects/methods)\n2. Component/Interface testing\n3. System testing (integrated components)",
    },
    {
      id: "l9-8",
      topic: "Unit Testing",
      question: "What does complete Object Class Testing involve?",
      answer:
        "Testing all operations, setting/interrogating all attributes, and exercising the object in all possible states.",
    },
    {
      id: "l9-9",
      topic: "Testing Strategies",
      question: "What is Partition Testing?",
      answer:
        "Identifying groups of inputs (equivalence partitions) that should be processed in the same way and testing one from each group.",
    },
    {
      id: "l9-10",
      topic: "Release Testing",
      question: "What is Release Testing?",
      answer:
        "A separate team tests a complete version of the system before release to convince the supplier it is good enough for use (Black-box testing).",
    },
    {
      id: "l9-11",
      topic: "User Testing",
      question: "Define Alpha, Beta, and Acceptance Testing.",
      answer:
        "Alpha: Users test at developer's site.\nBeta: Release made available to users to experiment.\nAcceptance: Customers test to decide whether to accept/pay for the system.",
    },
    {
      id: "l9-12",
      topic: "TDD",
      question: "What are 3 benefits of Test-Driven Development (TDD)?",
      answer:
        "1. High code coverage.\n2. Regression testing suite built incrementally.\n3. Simplified debugging (bugs are in the last small code change).",
    },
    {
      id: "l9-13",
      topic: "Regression Testing",
      question: "What is Regression Testing?",
      answer:
        "Re-running tests to check that changes have not 'broken' previously working code.",
    },
  ];

  // Data for Lecture 10
  const lecture10Data = [
    {
      id: "l10-1",
      topic: "Software Evolution",
      question: "Why is Software Change inevitable?",
      answer:
        "Requirements change, the environment changes, and errors are found. Maintenance costs typically exceed development costs.",
    },
    {
      id: "l10-2",
      topic: "DevOps",
      question: "What is Continuous Integration (CI)?",
      answer:
        "A practice where developers regularly integrate code into a shared repository, triggering automated builds and tests.",
    },
    {
      id: "l10-3",
      topic: "Technical Debt",
      question: "What is Technical Debt?",
      answer:
        "The implied cost of additional rework caused by choosing an easy/limited solution now instead of a better approach. Interest accumulates over time.",
    },
    {
      id: "l10-4",
      topic: "Reengineering",
      question: "What is Software Reengineering?",
      answer:
        "Restructuring or re-writing part or all of a legacy system without changing its functionality to improve maintainability.",
    },
    {
      id: "l10-5",
      topic: "Refactoring",
      question: "What is Refactoring?",
      answer:
        "Modifying a program to improve its structure, reduce complexity, or make it easier to understand WITHOUT changing its external behavior.",
    },
    {
      id: "l10-6",
      topic: "Refactoring",
      question: "Give 3 examples of 'Bad Smells' in code.",
      answer:
        "1. Duplicate code\n2. Long methods\n3. God classes (Large classes)\n4. Long parameter lists",
    },
    {
      id: "l10-7",
      topic: "Maintenance",
      question: "What are the 3 types of Software Maintenance?",
      answer:
        "1. Corrective (repairing faults)\n2. Adaptive (adapting to new environment)\n3. Evolutionary (adding new functionality)",
    },
    {
      id: "l10-8",
      topic: "Maintenance Costs",
      question: "What factors affect Maintenance Costs?",
      answer:
        "Team stability, contractual responsibility, staff skills, program age, and structure complexity.",
    },
    {
      id: "l10-9",
      topic: "Legacy Systems",
      question: "What are the 4 strategies for Legacy System Management?",
      answer:
        "1. Scrap (remove)\n2. Maintain (continue as is)\n3. Reengineer (improve quality)\n4. Replace (with new system)",
    },
    {
      id: "l10-10",
      topic: "Legacy Assessment",
      question: "How do you decide the strategy for a Legacy System?",
      answer:
        "By assessing its Business Value (high/low) and System Quality (high/low). (e.g., High Value + Low Quality = Reengineer/Replace).",
    },
  ];

  // Data for Lecture 11
  const lecture11Data = [
    {
      id: "l11-1",
      topic: "Project Mgmt",
      question:
        "What are the Success Criteria for Software Project Management?",
      answer:
        "1. Deliver on time\n2. Keep within budget\n3. Meet customer expectations\n4. Maintain a happy development team",
    },
    {
      id: "l11-2",
      topic: "Project Mgmt",
      question: "What makes Software Management distinct?",
      answer:
        "1. The product is intangible (cannot be seen/touched).\n2. Projects are often 'one-off' (unique).\n3. Processes are variable and organization-specific.",
    },
    {
      id: "l11-3",
      topic: "Mgmt Activities",
      question: "List 5 key Project Management Activities.",
      answer:
        "1. Project Planning\n2. Risk Management\n3. People Management\n4. Reporting\n5. Contract Negotiation",
    },
    {
      id: "l11-4",
      topic: "Planning",
      question: "What is Project Scheduling?",
      answer:
        "Deciding how work will be organized as separate tasks, estimating time/effort, and assigning resources.",
    },
    {
      id: "l11-5",
      topic: "Scheduling",
      question: "What is a common problem in Project Scheduling (Brooks' Law)?",
      answer:
        "Adding people to a late project makes it later (due to communication overhead and training).",
    },
    {
      id: "l11-6",
      topic: "Estimation",
      question: "What are the two main types of Estimation Techniques?",
      answer:
        "1. Experience-based (Manager's gut feeling/past experience).\n2. Algorithmic (Formulaic approach like COCOMO).",
    },
    {
      id: "l11-7",
      topic: "COCOMO II",
      question: "What is COCOMO II?",
      answer:
        "An algorithmic cost model that uses project, product, hardware, and personnel attributes to derive a cost estimate.",
    },
    {
      id: "l11-8",
      topic: "Risk Mgmt",
      question: "What are the two main steps in Risk Management?",
      answer:
        "1. Risk Analysis (Assess likelihood and consequences).\n2. Risk Planning (Draw plans to avoid/minimize effects).",
    },
    {
      id: "l11-9",
      topic: "People Mgmt",
      question: "What are 4 key factors in People Management?",
      answer:
        "1. Consistency (treat everyone comparably)\n2. Respect\n3. Inclusion\n4. Honesty",
    },
    {
      id: "l11-10",
      topic: "Motivation",
      question: "Describe Maslow's Hierarchy of Needs in a work context.",
      answer:
        "Basic needs (physio/safety) -> Social (belonging) -> Esteem (recognition) -> Self-realization (training/responsibility).",
    },
    {
      id: "l11-11",
      topic: "Teams",
      question: "What is the optimal Team Size (Two Pizza Rule)?",
      answer: "Between 4 to 6 members. (Small groups communicate better).",
    },
    {
      id: "l11-12",
      topic: "Teams",
      question: "What factors influence Team Effectiveness?",
      answer:
        "1. People mix (balance of skills/personalities).\n2. Group organization (everyone contributes).\n3. Good technical/managerial communication.",
    },
  ];

  // Data for Lecture 12
  const lecture12Data = [
    {
      id: "l12-1",
      topic: "Distributed Systems",
      question: "What are Distributed Systems?",
      answer:
        "Virtually all large computer-based systems where processing is shared across networked computers. (No single authority).",
    },
    {
      id: "l12-2",
      topic: "Distributed Systems",
      question: "What are the main issues with Distributed Systems?",
      answer:
        "1. Complexity (independent management, network issues).\n2. No single authority (security/policy challenges).\n3. Heterogeneity (different hardware/software).",
    },
    {
      id: "l12-3",
      topic: "Mobile Apps",
      question: "What defines Mobile Applications?",
      answer:
        "Software designed to run on smartphones, tablets, and other mobile devices, often dealing with variable connectivity and power constraints.",
    },
    {
      id: "l12-4",
      topic: "Embedded Systems",
      question: "What are Embedded Systems?",
      answer:
        "Software embedded in system hardware (often ROM) that usually responds in real-time.",
    },
    {
      id: "l12-5",
      topic: "Embedded Systems",
      question: "What are the dominant design issues for Embedded Systems?",
      answer:
        "Safety and Reliability (often critical systems like medical devices or car brakes).",
    },
    {
      id: "l12-6",
      topic: "Cloud Computing",
      question: "What is Cloud Computing?",
      answer:
        "Using large groups of remote networked servers to allow centralized data storage and online access to computer services/resources.",
    },
    {
      id: "l12-7",
      topic: "Trends",
      question: "List 4 major Technological Trends in Software Engineering.",
      answer:
        "1. Internet of Things (IoT) & Robotics\n2. Big Data & Business Intelligence (BI)\n3. AI & Bots\n4. Automation & Cyber Security",
    },
  ];

  useEffect(() => {
    // Initial load - show all
    setActiveCards([
      ...lecture1Data,
      ...lecture2Data,
      ...lecture3Data,
      ...lecture4Data,
      ...lecture5Data,
      ...lecture6Data,
      ...lecture7Data,
      ...lecture8Data,
      ...lecture9Data,
      ...lecture10Data,
      ...lecture11Data,
      ...lecture12Data,
    ]);
  }, []);

  const handleDeckChange = (deck) => {
    setSelectedDeck(deck);
    setIsFlipped(false);
    setCurrentCard(0);

    if (deck === "lecture1") {
      setActiveCards(lecture1Data);
    } else if (deck === "lecture2") {
      setActiveCards(lecture2Data);
    } else if (deck === "lecture3") {
      setActiveCards(lecture3Data);
    } else if (deck === "lecture4") {
      setActiveCards(lecture4Data);
    } else if (deck === "lecture5") {
      setActiveCards(lecture5Data);
    } else if (deck === "lecture6") {
      setActiveCards(lecture6Data);
    } else if (deck === "lecture7") {
      setActiveCards(lecture7Data);
    } else if (deck === "lecture8") {
      setActiveCards(lecture8Data);
    } else if (deck === "lecture9") {
      setActiveCards(lecture9Data);
    } else if (deck === "lecture10") {
      setActiveCards(lecture10Data);
    } else if (deck === "lecture11") {
      setActiveCards(lecture11Data);
    } else if (deck === "lecture12") {
      setActiveCards(lecture12Data);
    } else {
      setActiveCards([
        ...lecture1Data,
        ...lecture2Data,
        ...lecture3Data,
        ...lecture4Data,
        ...lecture5Data,
        ...lecture6Data,
        ...lecture7Data,
        ...lecture8Data,
        ...lecture9Data,
        ...lecture10Data,
        ...lecture11Data,
        ...lecture12Data,
      ]);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % activeCards.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard(
        (prev) => (prev - 1 + activeCards.length) % activeCards.length
      );
    }, 200);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...activeCards].sort(() => Math.random() - 0.5);
      setActiveCards(shuffled);
      setCurrentCard(0);
    }, 200);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (activeCards.length === 0)
    return <div className="p-8 text-center">Loading Flashcards...</div>;

  const currentCardData = activeCards[currentCard];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans text-gray-800">
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">
          Software Engineering Exam Prep
        </h1>
        <p className="text-gray-500">Mastering Lectures 1 - 12</p>
      </header>

      {/* Deck Selectors */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white p-1 rounded-lg shadow-sm border border-gray-200 max-w-6xl">
        <button
          onClick={() => handleDeckChange("all")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "all"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Layers size={16} /> All (
          {lecture1Data.length +
            lecture2Data.length +
            lecture3Data.length +
            lecture4Data.length +
            lecture5Data.length +
            lecture6Data.length +
            lecture7Data.length +
            lecture8Data.length +
            lecture9Data.length +
            lecture10Data.length +
            lecture11Data.length +
            lecture12Data.length}
          )
        </button>
        <button
          onClick={() => handleDeckChange("lecture1")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture1"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L1 ({lecture1Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture2")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture2"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L2 ({lecture2Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture3")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture3"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L3 ({lecture3Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture4")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture4"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L4 ({lecture4Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture5")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture5"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L5 ({lecture5Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture6")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture6"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L6 ({lecture6Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture7")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture7"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L7 ({lecture7Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture8")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture8"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L8 ({lecture8Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture9")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture9"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L9 ({lecture9Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture10")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture10"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L10 ({lecture10Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture11")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture11"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L11 ({lecture11Data.length})
        </button>
        <button
          onClick={() => handleDeckChange("lecture12")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedDeck === "lecture12"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen size={16} /> L12 ({lecture12Data.length})
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-6 flex items-center justify-between text-sm text-gray-500 font-medium">
        <span>
          Card {currentCard + 1} of {activeCards.length}
        </span>
        <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300 ease-out"
            style={{
              width: `${((currentCard + 1) / activeCards.length) * 100}%`,
            }}
          />
        </div>
        <span>
          {Math.round(((currentCard + 1) / activeCards.length) * 100)}%
        </span>
      </div>

      {/* Flashcard Area */}
      <div
        className="perspective-1000 w-full max-w-2xl h-80 cursor-pointer group"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front of Card (Question) */}
          <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl border-b-4 border-indigo-500 p-8 flex flex-col items-center justify-center backface-hidden z-10">
            <div className="absolute top-6 left-6 flex flex-col items-start gap-1">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Question
              </span>
              <span
                className={`text-xs font-medium text-white px-2 py-0.5 rounded-full uppercase tracking-wide ${
                  currentCardData.id.startsWith("l12")
                    ? "bg-fuchsia-600"
                    : currentCardData.id.startsWith("l11")
                    ? "bg-lime-600"
                    : currentCardData.id.startsWith("l10")
                    ? "bg-amber-500"
                    : currentCardData.id.startsWith("l1")
                    ? "bg-blue-500"
                    : currentCardData.id.startsWith("l2")
                    ? "bg-purple-500"
                    : currentCardData.id.startsWith("l3")
                    ? "bg-teal-500"
                    : currentCardData.id.startsWith("l4")
                    ? "bg-orange-500"
                    : currentCardData.id.startsWith("l5")
                    ? "bg-red-500"
                    : currentCardData.id.startsWith("l6")
                    ? "bg-indigo-500"
                    : currentCardData.id.startsWith("l7")
                    ? "bg-pink-500"
                    : currentCardData.id.startsWith("l8")
                    ? "bg-cyan-600"
                    : "bg-emerald-600"
                }`}
              >
                {currentCardData.id.startsWith("l12")
                  ? "Lecture 12"
                  : currentCardData.id.startsWith("l11")
                  ? "Lecture 11"
                  : currentCardData.id.startsWith("l10")
                  ? "Lecture 10"
                  : currentCardData.id.startsWith("l1")
                  ? "Lecture 1"
                  : currentCardData.id.startsWith("l2")
                  ? "Lecture 2"
                  : currentCardData.id.startsWith("l3")
                  ? "Lecture 3"
                  : currentCardData.id.startsWith("l4")
                  ? "Lecture 4"
                  : currentCardData.id.startsWith("l5")
                  ? "Lecture 5"
                  : currentCardData.id.startsWith("l6")
                  ? "Lecture 6"
                  : currentCardData.id.startsWith("l7")
                  ? "Lecture 7"
                  : currentCardData.id.startsWith("l8")
                  ? "Lecture 8"
                  : "Lecture 9"}
              </span>
            </div>

            {/* Added margins and scrolling to prevent overlap */}
            <h3 className="text-2xl font-semibold text-center leading-relaxed px-4 mt-16 mb-8 overflow-y-auto max-h-[14rem]">
              {currentCardData.question}
            </h3>
            <span className="absolute bottom-6 text-indigo-400 text-sm font-medium animate-pulse">
              Click to flip
            </span>
          </div>

          {/* Back of Card (Answer) */}
          <div className="absolute w-full h-full bg-indigo-600 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180">
            <span className="absolute top-6 left-6 text-xs font-bold tracking-widest text-indigo-200 uppercase">
              Answer
            </span>
            <span className="absolute top-6 right-6 text-xs font-medium text-indigo-300 bg-indigo-700 px-2 py-1 rounded-md uppercase tracking-wide">
              {currentCardData.topic}
            </span>
            {/* Added margins and scrolling to prevent overlap */}
            <p className="text-xl text-center leading-relaxed whitespace-pre-line text-white mt-12 overflow-y-auto max-h-[16rem] px-4">
              {currentCardData.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center gap-6">
        <button
          onClick={handlePrev}
          className="p-4 rounded-full bg-white shadow-md hover:bg-gray-100 text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          title="Previous Card"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={handleFlip}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 font-semibold flex items-center gap-2 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <RotateCw size={20} />
          Flip Card
        </button>

        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-white shadow-md hover:bg-gray-100 text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          title="Next Card"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="mt-8">
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium"
        >
          <Shuffle size={16} />
          Shuffle Cards
        </button>
      </div>

      {/* Dynamic Key Topics Legend */}
      <div className="mt-12 w-full max-w-2xl border-t border-gray-200 pt-8">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
          Topics in{" "}
          {selectedDeck === "all"
            ? "All Lectures"
            : selectedDeck.replace("lecture", "Lecture ")}
        </h4>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(activeCards.map((c) => c.topic))).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200 flex items-center gap-1"
            >
              <CheckCircle2 size={12} className="text-green-500" /> {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardApp;
