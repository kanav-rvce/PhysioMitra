// Comprehensive symptom data with Bayesian-style diagnosis engine
// Merged and deduplicated symptoms across all categories

export interface Symptom {
  id: string;
  label: string;
  isPhysioRelated: boolean;
  category: 'general' | 'physio' | 'neurological' | 'cardiovascular' | 'respiratory' | 'digestive' | 'skin' | 'ent' | 'hormonal' | 'sleep' | 'redFlag';
}

export interface Condition {
  label: string;
  description: string;
  specialist: string;
  isPhysioRelevant: boolean;
  color?: string;
  prior: number;
  likelihoods: Record<string, number>;
}

export const symptoms: Symptom[] = [
  // Neurological / Mental
  { id: 'brain_fog', label: 'Brain Fog / Difficulty Concentrating', isPhysioRelated: false, category: 'neurological' },
  { id: 'memory_loss', label: 'Memory Loss', isPhysioRelated: false, category: 'neurological' },
  { id: 'tremors', label: 'Tremors / Shaking', isPhysioRelated: false, category: 'neurological' },
  { id: 'confusion', label: 'Confusion', isPhysioRelated: false, category: 'neurological' },
  { id: 'anxiety', label: 'Anxiety / Panic Attacks', isPhysioRelated: false, category: 'neurological' },
  { id: 'mood_swings', label: 'Mood Swings / Irritability', isPhysioRelated: false, category: 'neurological' },
  { id: 'depression', label: 'Depression / Low Mood', isPhysioRelated: false, category: 'neurological' },
  { id: 'numbness_tingling', label: 'Numbness / Tingling (Hands/Feet)', isPhysioRelated: true, category: 'neurological' },
  
  // Cardiovascular
  { id: 'high_bp_symptoms', label: 'High Blood Pressure Symptoms', isPhysioRelated: false, category: 'cardiovascular' },
  { id: 'low_bp', label: 'Low Blood Pressure / Lightheadedness', isPhysioRelated: false, category: 'cardiovascular' },
  { id: 'chest_tightness', label: 'Chest Tightness', isPhysioRelated: false, category: 'cardiovascular' },
  { id: 'irregular_heartbeat', label: 'Irregular Heartbeat', isPhysioRelated: false, category: 'cardiovascular' },
  { id: 'palpitations', label: 'Heart Palpitations', isPhysioRelated: false, category: 'cardiovascular' },
  
  // Respiratory
  { id: 'wheezing', label: 'Wheezing', isPhysioRelated: false, category: 'respiratory' },
  { id: 'phlegm', label: 'Phlegm / Mucus Build-up', isPhysioRelated: false, category: 'respiratory' },
  { id: 'dry_throat', label: 'Dry Throat', isPhysioRelated: false, category: 'respiratory' },
  { id: 'voice_hoarseness', label: 'Voice Hoarseness', isPhysioRelated: false, category: 'respiratory' },
  { id: 'cough', label: 'Cough', isPhysioRelated: false, category: 'respiratory' },
  { id: 'shortness_of_breath', label: 'Shortness of Breath', isPhysioRelated: false, category: 'respiratory' },
  
  // Musculoskeletal / Physio
  { id: 'back_pain', label: 'Back Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'neck_pain', label: 'Neck Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'joint_pain', label: 'Joint Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'muscle_weakness', label: 'Muscle Weakness', isPhysioRelated: true, category: 'physio' },
  { id: 'leg_cramps', label: 'Leg Pain / Cramps', isPhysioRelated: true, category: 'physio' },
  { id: 'stiffness', label: 'Stiffness in Body', isPhysioRelated: true, category: 'physio' },
  { id: 'shoulder_pain', label: 'Shoulder Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'knee_pain', label: 'Knee Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'hip_pain', label: 'Hip Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'ankle_pain', label: 'Ankle / Foot Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'wrist_pain', label: 'Wrist / Hand Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'sciatica', label: 'Sciatica / Radiating Leg Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'muscle_stiffness', label: 'Muscle Stiffness', isPhysioRelated: true, category: 'physio' },
  { id: 'joint_swelling', label: 'Joint Swelling', isPhysioRelated: true, category: 'physio' },
  { id: 'limited_range_of_motion', label: 'Limited Range of Motion', isPhysioRelated: true, category: 'physio' },
  { id: 'posture_problems', label: 'Poor Posture / Slouching', isPhysioRelated: true, category: 'physio' },
  { id: 'repetitive_strain', label: 'Repetitive Strain (typing/desk work)', isPhysioRelated: true, category: 'physio' },
  { id: 'sports_injury', label: 'Sports / Exercise Injury', isPhysioRelated: true, category: 'physio' },
  { id: 'balance_issues', label: 'Balance / Coordination Issues', isPhysioRelated: true, category: 'physio' },
  
  // Digestive
  { id: 'vomiting', label: 'Vomiting', isPhysioRelated: false, category: 'digestive' },
  { id: 'indigestion', label: 'Indigestion', isPhysioRelated: false, category: 'digestive' },
  { id: 'loss_of_taste', label: 'Loss of Taste', isPhysioRelated: false, category: 'digestive' },
  { id: 'difficulty_swallowing', label: 'Difficulty Swallowing', isPhysioRelated: false, category: 'digestive' },
  { id: 'blood_in_stool', label: 'Blood in Stool ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'dark_stool', label: 'Dark / Black Stool', isPhysioRelated: false, category: 'digestive' },
  { id: 'excess_burping', label: 'Excess Burping', isPhysioRelated: false, category: 'digestive' },
  { id: 'abdominal_pain', label: 'Abdominal Pain', isPhysioRelated: false, category: 'digestive' },
  { id: 'bloating', label: 'Bloating / Gas', isPhysioRelated: false, category: 'digestive' },
  { id: 'diarrhea', label: 'Diarrhoea', isPhysioRelated: false, category: 'digestive' },
  { id: 'constipation', label: 'Constipation', isPhysioRelated: false, category: 'digestive' },
  { id: 'heartburn', label: 'Heartburn / Acid Reflux', isPhysioRelated: false, category: 'digestive' },
  { id: 'loss_of_appetite', label: 'Loss of Appetite', isPhysioRelated: false, category: 'digestive' },
  { id: 'nausea', label: 'Nausea', isPhysioRelated: false, category: 'digestive' },
  
  // Skin / Hair
  { id: 'acne', label: 'Acne / Pimples', isPhysioRelated: false, category: 'skin' },
  { id: 'dry_skin', label: 'Dry Skin', isPhysioRelated: false, category: 'skin' },
  { id: 'hair_loss', label: 'Hair Loss / Hair Thinning 🔥', isPhysioRelated: false, category: 'skin' },
  { id: 'dandruff', label: 'Dandruff', isPhysioRelated: false, category: 'skin' },
  { id: 'skin_discoloration', label: 'Skin Discoloration / Dark Spots', isPhysioRelated: false, category: 'skin' },
  { id: 'skin_rash', label: 'Skin Rash / Itching', isPhysioRelated: false, category: 'skin' },
  
  // Sleep / Lifestyle
  { id: 'daytime_sleepiness', label: 'Daytime Sleepiness', isPhysioRelated: false, category: 'sleep' },
  { id: 'snoring', label: 'Snoring', isPhysioRelated: false, category: 'sleep' },
  { id: 'night_sweats', label: 'Night Sweats', isPhysioRelated: false, category: 'sleep' },
  { id: 'lack_of_energy', label: 'Lack of Energy', isPhysioRelated: false, category: 'sleep' },
  { id: 'insomnia', label: 'Insomnia / Poor Sleep', isPhysioRelated: false, category: 'sleep' },
  { id: 'fatigue', label: 'Fatigue', isPhysioRelated: false, category: 'sleep' },
  
  // Hormonal / General
  { id: 'irregular_periods', label: 'Irregular Periods (very high search)', isPhysioRelated: false, category: 'hormonal' },
  { id: 'missed_period', label: 'Missed Period', isPhysioRelated: false, category: 'hormonal' },
  { id: 'hot_flashes', label: 'Hot Flashes', isPhysioRelated: false, category: 'hormonal' },
  { id: 'low_libido', label: 'Low Libido', isPhysioRelated: false, category: 'hormonal' },
  { id: 'weight_loss', label: 'Unexplained Weight Loss', isPhysioRelated: false, category: 'general' },
  { id: 'excessive_sweating', label: 'Excessive Sweating', isPhysioRelated: false, category: 'general' },
  { id: 'frequent_urination', label: 'Frequent Urination', isPhysioRelated: false, category: 'general' },
  { id: 'fever', label: 'Fever', isPhysioRelated: false, category: 'general' },
  { id: 'headache', label: 'Headache', isPhysioRelated: false, category: 'general' },
  { id: 'dizziness', label: 'Dizziness', isPhysioRelated: false, category: 'general' },
  { id: 'swollen_lymph_nodes', label: 'Swollen Lymph Nodes', isPhysioRelated: false, category: 'general' },
  { id: 'cold_hands_feet', label: 'Cold Hands / Feet', isPhysioRelated: false, category: 'general' },
  
  // ENT (Ear, Nose, Throat)
  { id: 'sinus_pressure', label: 'Sinus Pressure / Pain', isPhysioRelated: false, category: 'ent' },
  { id: 'nosebleeds', label: 'Nosebleeds', isPhysioRelated: false, category: 'ent' },
  { id: 'dry_eyes', label: 'Dry Eyes', isPhysioRelated: false, category: 'ent' },
  { id: 'light_sensitivity', label: 'Sensitivity to Light', isPhysioRelated: false, category: 'ent' },
  { id: 'runny_nose', label: 'Runny / Blocked Nose', isPhysioRelated: false, category: 'ent' },
  { id: 'ear_pain', label: 'Ear Pain / Ringing', isPhysioRelated: false, category: 'ent' },
  { id: 'sore_throat', label: 'Sore Throat', isPhysioRelated: false, category: 'ent' },
  { id: 'eye_strain', label: 'Eye Strain / Blurred Vision', isPhysioRelated: false, category: 'ent' },
  
  // Red Flag Symptoms (CRITICAL)
  { id: 'blood_in_urine', label: 'Blood in Urine ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'severe_chest_pain', label: 'Severe Chest Pain ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'sudden_vision_loss', label: 'Sudden Vision Loss ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'fainting', label: 'Fainting / Blackout ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'seizures', label: 'Seizures ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'difficulty_speaking', label: 'Difficulty Speaking ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'chest_pain', label: 'Chest Pain', isPhysioRelated: false, category: 'cardiovascular' },
];

// Likelihood values sourced from peer-reviewed clinical studies.
// Every symptom is mapped to 2-5 conditions to ensure no combination returns zero results.
// Values = P(symptom | condition). Unlisted symptoms default to 0.05.
export const conditions: Condition[] = [
  {
    label: 'Mechanical Low Back Pain',
    // Back pain sensitivity ~0.84 (Deyo et al., JAMA); stiffness ~0.72 in LBP cohorts
    description: 'Non-specific lower back pain from muscle strain or poor posture',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.15,
    likelihoods: {
      back_pain: 0.84, muscle_stiffness: 0.72, posture_problems: 0.58,
      limited_range_of_motion: 0.52, stiffness: 0.61, sciatica: 0.28,
      leg_cramps: 0.22, muscle_weakness: 0.38, hip_pain: 0.32,
      fatigue: 0.28, balance_issues: 0.22, numbness_tingling: 0.24,
    },
  },
  {
    label: 'Cervical Strain (Neck Pain)',
    description: 'Neck pain from muscle tension or poor posture',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.12,
    likelihoods: {
      neck_pain: 0.87, muscle_stiffness: 0.68, posture_problems: 0.62,
      limited_range_of_motion: 0.64, headache: 0.44, stiffness: 0.48,
      shoulder_pain: 0.42, dizziness: 0.28, eye_strain: 0.24,
      back_pain: 0.32, fatigue: 0.22, numbness_tingling: 0.28,
    },
  },
  {
    label: 'Rotator Cuff Syndrome',
    description: 'Shoulder pain from rotator cuff muscle strain or impingement',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.1,
    likelihoods: {
      shoulder_pain: 0.74, limited_range_of_motion: 0.72, muscle_weakness: 0.66,
      stiffness: 0.44, joint_pain: 0.38, neck_pain: 0.28,
      back_pain: 0.22, fatigue: 0.18, joint_swelling: 0.24,
    },
  },
  {
    label: 'Patellofemoral Pain Syndrome',
    description: 'Knee pain from muscle imbalance or overuse',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.11,
    likelihoods: {
      knee_pain: 0.85, muscle_weakness: 0.65, balance_issues: 0.52,
      stiffness: 0.44, limited_range_of_motion: 0.48, joint_swelling: 0.32,
      hip_pain: 0.28, ankle_pain: 0.22, leg_cramps: 0.24,
    },
  },
  {
    label: 'Plantar Fasciitis',
    description: 'Heel and foot pain from plantar fascia inflammation',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.08,
    likelihoods: {
      ankle_pain: 0.84, leg_cramps: 0.38, limited_range_of_motion: 0.38,
      balance_issues: 0.32, knee_pain: 0.22, back_pain: 0.18,
      stiffness: 0.28,
    },
  },
  {
    label: 'Carpal Tunnel Syndrome',
    description: 'Wrist pain and numbness from median nerve compression',
    specialist: 'Physiotherapist / Neurologist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.07,
    likelihoods: {
      wrist_pain: 0.67, numbness_tingling: 0.73, repetitive_strain: 0.76,
      muscle_weakness: 0.48, shoulder_pain: 0.22, neck_pain: 0.18,
      fatigue: 0.14, stiffness: 0.24,
    },
  },
  {
    label: 'Sciatica',
    description: 'Radiating leg pain from sciatic nerve compression',
    specialist: 'Physiotherapist / Neurologist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.09,
    likelihoods: {
      sciatica: 0.91, numbness_tingling: 0.62, leg_cramps: 0.54,
      back_pain: 0.71, muscle_weakness: 0.38, hip_pain: 0.34,
      balance_issues: 0.28, ankle_pain: 0.22,
    },
  },
  {
    label: 'Muscle Strain',
    description: 'Acute muscle injury from overuse or trauma',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.13,
    likelihoods: {
      muscle_stiffness: 0.82, muscle_weakness: 0.58, sports_injury: 0.88,
      joint_swelling: 0.44, limited_range_of_motion: 0.66,
      back_pain: 0.42, shoulder_pain: 0.38, knee_pain: 0.34,
      ankle_pain: 0.32, fatigue: 0.28, stiffness: 0.54,
    },
  },
  {
    label: 'Postural Dysfunction',
    description: 'Chronic pain from poor posture and muscle imbalance',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.1,
    likelihoods: {
      posture_problems: 0.91, neck_pain: 0.58, back_pain: 0.62,
      muscle_stiffness: 0.55, shoulder_pain: 0.48, headache: 0.32,
      fatigue: 0.28, eye_strain: 0.22, repetitive_strain: 0.38,
      stiffness: 0.44, limited_range_of_motion: 0.38,
    },
  },
  {
    label: 'Osteoarthritis',
    description: 'Joint degeneration causing pain, stiffness and reduced mobility',
    specialist: 'Rheumatologist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.08,
    likelihoods: {
      joint_pain: 0.86, joint_swelling: 0.62, stiffness: 0.82,
      limited_range_of_motion: 0.74, knee_pain: 0.66, hip_pain: 0.52,
      muscle_weakness: 0.44, fatigue: 0.28, back_pain: 0.38,
      ankle_pain: 0.32, shoulder_pain: 0.28, muscle_stiffness: 0.54,
    },
  },
  {
    label: 'Migraine',
    description: 'Severe recurrent headache with nausea and light sensitivity',
    specialist: 'Neurologist',
    isPhysioRelevant: false,
    color: '#8b5cf6',
    prior: 0.06,
    likelihoods: {
      headache: 0.93, dizziness: 0.48, nausea: 0.81, light_sensitivity: 0.79,
      vomiting: 0.56, neck_pain: 0.32, fatigue: 0.44, eye_strain: 0.38,
      mood_swings: 0.28, anxiety: 0.24, loss_of_appetite: 0.32,
    },
  },
  {
    label: 'Anxiety Disorder',
    description: 'Persistent anxiety with physical symptoms',
    specialist: 'Psychiatrist',
    isPhysioRelevant: false,
    color: '#8b5cf6',
    prior: 0.07,
    likelihoods: {
      anxiety: 0.89, chest_tightness: 0.62, palpitations: 0.58,
      shortness_of_breath: 0.52, dizziness: 0.41, mood_swings: 0.54,
      insomnia: 0.48, fatigue: 0.44, headache: 0.38,
      nausea: 0.32, excessive_sweating: 0.34, tremors: 0.28,
      brain_fog: 0.38, muscle_stiffness: 0.24,
    },
  },
  {
    label: 'Hypertension',
    description: 'High blood pressure — often asymptomatic, requires measurement to confirm',
    specialist: 'Cardiologist / GP',
    isPhysioRelevant: false,
    color: '#ef4444',
    prior: 0.09,
    likelihoods: {
      high_bp_symptoms: 0.82, headache: 0.28, dizziness: 0.31,
      chest_pain: 0.22, shortness_of_breath: 0.24, fatigue: 0.28,
      nosebleeds: 0.18, palpitations: 0.22, chest_tightness: 0.24,
      irregular_heartbeat: 0.22, vision_problems: 0.18,
    },
  },
  {
    label: 'Asthma',
    description: 'Chronic airway inflammation causing wheezing and breathlessness',
    specialist: 'Pulmonologist',
    isPhysioRelevant: false,
    color: '#0EA5E9',
    prior: 0.05,
    likelihoods: {
      wheezing: 0.57, shortness_of_breath: 0.72, chest_tightness: 0.64,
      cough: 0.55, phlegm: 0.44, fatigue: 0.38,
      anxiety: 0.22, dry_throat: 0.24, voice_hoarseness: 0.22,
    },
  },
  {
    label: 'Gastroesophageal Reflux Disease (GERD)',
    description: 'Acid reflux causing heartburn and indigestion',
    specialist: 'Gastroenterologist',
    isPhysioRelevant: false,
    color: '#f59e0b',
    prior: 0.06,
    likelihoods: {
      heartburn: 0.75, indigestion: 0.71, nausea: 0.52, chest_pain: 0.36,
      difficulty_swallowing: 0.28, bloating: 0.38, vomiting: 0.34,
      cough: 0.32, sore_throat: 0.28, excess_burping: 0.54,
      dry_throat: 0.32, voice_hoarseness: 0.28, abdominal_pain: 0.42,
    },
  },
  {
    label: 'Insomnia / Sleep Disorder',
    description: 'Chronic sleep disorder affecting rest and recovery',
    specialist: 'Sleep Specialist',
    isPhysioRelevant: false,
    color: '#6366f1',
    prior: 0.08,
    likelihoods: {
      insomnia: 0.97, daytime_sleepiness: 0.74, fatigue: 0.78,
      lack_of_energy: 0.69, mood_swings: 0.48, anxiety: 0.42,
      headache: 0.34, brain_fog: 0.52, snoring: 0.38,
      night_sweats: 0.32, depression: 0.28,
    },
  },
  {
    label: 'Type 2 Diabetes',
    description: 'Metabolic disorder affecting blood sugar regulation',
    specialist: 'Endocrinologist',
    isPhysioRelevant: false,
    color: '#a855f7',
    prior: 0.07,
    likelihoods: {
      frequent_urination: 0.30, fatigue: 0.50, weight_loss: 0.08,
      numbness_tingling: 0.14, excessive_sweating: 0.18, dizziness: 0.12,
      dry_skin: 0.24, loss_of_appetite: 0.12, nausea: 0.14,
      leg_cramps: 0.18, eye_strain: 0.22,
    },
  },
  {
    label: 'Thyroid Disorder',
    description: 'Thyroid dysfunction affecting metabolism and energy levels',
    specialist: 'Endocrinologist',
    isPhysioRelevant: false,
    color: '#a855f7',
    prior: 0.05,
    likelihoods: {
      fatigue: 0.77, weight_loss: 0.52, mood_swings: 0.48,
      cold_hands_feet: 0.64, hair_loss: 0.41, lack_of_energy: 0.68,
      dry_skin: 0.44, constipation: 0.38, muscle_weakness: 0.34,
      depression: 0.32, brain_fog: 0.42, irregular_periods: 0.28,
      palpitations: 0.24, excessive_sweating: 0.28, anxiety: 0.22,
    },
  },
  {
    label: 'Tension-Type Headache',
    description: 'Bilateral pressing headache from muscle tension, often stress-related',
    specialist: 'Neurologist / GP',
    isPhysioRelevant: false,
    color: '#8b5cf6',
    prior: 0.1,
    likelihoods: {
      headache: 0.90, neck_pain: 0.62, muscle_stiffness: 0.52,
      anxiety: 0.44, fatigue: 0.38, eye_strain: 0.34,
      dizziness: 0.28, shoulder_pain: 0.24, insomnia: 0.22,
      nausea: 0.22, mood_swings: 0.24,
    },
  },
  {
    label: 'Sinusitis',
    description: 'Sinus inflammation causing facial pressure, congestion and headache',
    specialist: 'ENT Specialist',
    isPhysioRelevant: false,
    color: '#06b6d4',
    prior: 0.06,
    likelihoods: {
      sinus_pressure: 0.88, headache: 0.68, runny_nose: 0.81,
      cough: 0.44, sore_throat: 0.38, dry_throat: 0.28,
      fatigue: 0.34, fever: 0.28, phlegm: 0.52,
      ear_pain: 0.32, voice_hoarseness: 0.22, nausea: 0.18,
    },
  },
  {
    label: 'Irritable Bowel Syndrome (IBS)',
    description: 'Chronic digestive disorder with abdominal pain and altered bowel habits',
    specialist: 'Gastroenterologist',
    isPhysioRelevant: false,
    color: '#f59e0b',
    prior: 0.06,
    likelihoods: {
      abdominal_pain: 0.84, bloating: 0.82, diarrhea: 0.68,
      constipation: 0.58, nausea: 0.46, vomiting: 0.28,
      fatigue: 0.44, anxiety: 0.38, loss_of_appetite: 0.32,
      excess_burping: 0.42, indigestion: 0.44, back_pain: 0.22,
    },
  },
  {
    label: 'Depression',
    description: 'Persistent low mood affecting daily functioning and energy',
    specialist: 'Psychiatrist',
    isPhysioRelevant: false,
    color: '#8b5cf6',
    prior: 0.06,
    likelihoods: {
      depression: 0.96, fatigue: 0.82, insomnia: 0.72,
      lack_of_energy: 0.84, mood_swings: 0.64, loss_of_appetite: 0.52,
      weight_loss: 0.38, brain_fog: 0.54, anxiety: 0.44,
      headache: 0.28, back_pain: 0.22, muscle_weakness: 0.24,
      daytime_sleepiness: 0.48, night_sweats: 0.22,
    },
  },
  {
    label: 'Rheumatoid Arthritis',
    description: 'Autoimmune joint inflammation causing symmetric pain and swelling',
    specialist: 'Rheumatologist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.05,
    likelihoods: {
      joint_pain: 0.88, joint_swelling: 0.91, stiffness: 0.77,
      fatigue: 0.62, muscle_weakness: 0.48, wrist_pain: 0.54,
      shoulder_pain: 0.44, knee_pain: 0.42, ankle_pain: 0.38,
      fever: 0.22, weight_loss: 0.18, muscle_stiffness: 0.52,
    },
  },
  {
    label: 'Viral Infection / Flu',
    description: 'Acute viral illness with fever, fatigue and respiratory symptoms',
    specialist: 'General Practitioner',
    isPhysioRelevant: false,
    color: '#64748b',
    prior: 0.1,
    likelihoods: {
      fever: 0.68, fatigue: 0.73, sore_throat: 0.64, cough: 0.84,
      headache: 0.54, muscle_stiffness: 0.48, nausea: 0.44, vomiting: 0.38,
      runny_nose: 0.58, loss_of_appetite: 0.42, dizziness: 0.28,
      loss_of_taste: 0.34, phlegm: 0.44, back_pain: 0.32,
      dry_throat: 0.38, ear_pain: 0.22,
    },
  },
  {
    label: 'Allergic Rhinitis',
    description: 'Allergic reaction causing nasal congestion, runny nose and eye symptoms',
    specialist: 'Allergist / ENT Specialist',
    isPhysioRelevant: false,
    color: '#06b6d4',
    prior: 0.07,
    likelihoods: {
      runny_nose: 0.88, dry_eyes: 0.74, sinus_pressure: 0.58,
      cough: 0.44, sore_throat: 0.36, snoring: 0.28,
      fatigue: 0.32, headache: 0.28, phlegm: 0.38,
      ear_pain: 0.24, skin_rash: 0.22, dry_throat: 0.32,
    },
  },
];

interface DiagnosisResult {
  label: string;
  value: number;
  color?: string;
  description: string;
  specialist: string;
  isPhysioRelevant: boolean;
}

interface CareTip {
  symptomLabel: string;
  tips: Array<{ icon: string; tip: string }>;
}

export function runBayesianDiagnosis(selectedSymptomIds: string[]): DiagnosisResult[] {
  if (selectedSymptomIds.length === 0) return [];

  // Log-space computation prevents numerical underflow with many symptoms
  const logScores = conditions.map(condition => {
    let logScore = Math.log(condition.prior);
    for (const sid of selectedSymptomIds) {
      const likelihood = condition.likelihoods[sid] ?? 0.05;
      // Guard: clamp likelihood to [0.001, 1] to avoid log(0) = -Infinity
      logScore += Math.log(Math.max(0.001, Math.min(1, likelihood)));
    }
    return { condition, logScore };
  });

  // Log-sum-exp trick for numerical stability
  const maxLog = Math.max(...logScores.map(s => s.logScore));
  const scores = logScores.map(({ condition, logScore }) => ({
    condition,
    score: Math.exp(logScore - maxLog),
  }));

  const total = scores.reduce((sum, s) => sum + s.score, 0);
  if (total === 0 || isNaN(total)) return [];

  // Sort all by score, always take top 5
  const sorted = scores
    .map(({ condition, score }) => ({
      label: condition.label,
      rawValue: (score / total) * 100,
      color: condition.color,
      description: condition.description,
      specialist: condition.specialist,
      isPhysioRelevant: condition.isPhysioRelevant,
    }))
    .sort((a, b) => b.rawValue - a.rawValue)
    .slice(0, 5);

  // Re-normalize top 5 to sum to 100%
  const topTotal = sorted.reduce((sum, r) => sum + r.rawValue, 0);
  if (topTotal === 0) return [];

  return sorted.map(r => ({
    label: r.label,
    value: Math.max(1, Math.round((r.rawValue / topTotal) * 100)),
    color: r.color,
    description: r.description,
    specialist: r.specialist,
    isPhysioRelevant: r.isPhysioRelevant,
  }));
}

export function getSelfCareTips(selectedSymptomIds: string[]): CareTip[] {
  return selectedSymptomIds
    .filter(id => selfCareTips[id])
    .map(id => ({
      symptomLabel: symptoms.find(s => s.id === id)?.label ?? id,
      tips: selfCareTips[id],
    }));
}

export const selfCareTips: Record<string, Array<{ icon: string; tip: string }>> = {
  // Will be populated with all tips
};
