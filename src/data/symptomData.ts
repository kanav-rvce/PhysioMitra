// Comprehensive symptom data with Bayesian-style diagnosis engine
// Merged with expanded symptom categories and medical accuracy

export interface Symptom {
  id: string;
  label: string;
  isPhysioRelated: boolean;
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
  // Physiotherapy-Related Symptoms (69 total)
  { id: 'back_pain', label: 'Back Pain (Mechanical Back Pain / Lumbar Strain)', isPhysioRelated: true },
  { id: 'lower_back_pain', label: 'Lower Back Pain (Lumbar Pain / Lumbago)', isPhysioRelated: true },
  { id: 'upper_back_pain', label: 'Upper Back Pain (Thoracic Pain)', isPhysioRelated: true },
  { id: 'neck_pain', label: 'Neck Pain (Cervicalgia)', isPhysioRelated: true },
  { id: 'shoulder_pain', label: 'Shoulder Pain (Rotator Cuff Syndrome)', isPhysioRelated: true },
  { id: 'knee_pain', label: 'Knee Pain (Patellofemoral Pain Syndrome)', isPhysioRelated: true },
  { id: 'hip_pain', label: 'Hip Pain (Hip Joint Dysfunction)', isPhysioRelated: true },
  { id: 'ankle_pain', label: 'Ankle / Foot Pain (Ankle Sprain / Plantar Fasciitis)', isPhysioRelated: true },
  { id: 'wrist_pain', label: 'Wrist / Hand Pain (Carpal Tunnel Syndrome / Tendinitis)', isPhysioRelated: true },
  { id: 'muscle_stiffness', label: 'Muscle Stiffness (Myofascial Tightness)', isPhysioRelated: true },
  { id: 'joint_swelling', label: 'Joint Swelling (Joint Effusion / Inflammation)', isPhysioRelated: true },
  { id: 'muscle_weakness', label: 'Muscle Weakness (Muscle Atrophy / Neuromuscular Weakness)', isPhysioRelated: true },
  { id: 'numbness_tingling', label: 'Numbness / Tingling (Paresthesia)', isPhysioRelated: true },
  { id: 'limited_range_of_motion', label: 'Limited Range of Motion (ROM Restriction)', isPhysioRelated: true },
  { id: 'posture_problems', label: 'Poor Posture / Slouching (Postural Dysfunction)', isPhysioRelated: true },
  { id: 'sciatica', label: 'Sciatica / Radiating Leg Pain (Lumbar Radiculopathy)', isPhysioRelated: true },
  { id: 'sports_injury', label: 'Sports / Exercise Injury (Soft Tissue Injury)', isPhysioRelated: true },
  { id: 'balance_issues', label: 'Balance / Coordination Issues (Proprioceptive Dysfunction)', isPhysioRelated: true },
  { id: 'repetitive_strain', label: 'Repetitive Strain (Repetitive Strain Injury – RSI)', isPhysioRelated: true },
  { id: 'joint_pain', label: 'Joint Pain (Arthralgia)', isPhysioRelated: true },
  { id: 'leg_cramps', label: 'Leg Pain / Cramps (Muscle Cramp / Claudication)', isPhysioRelated: true },
  { id: 'stiffness', label: 'Stiffness in Body (Generalized Rigidity)', isPhysioRelated: true },
  { id: 'difficulty_walking', label: 'Difficulty Walking (Gait Abnormality)', isPhysioRelated: true },
  { id: 'difficulty_standing_long', label: 'Difficulty Standing for Long Time (Postural Intolerance)', isPhysioRelated: true },
  { id: 'difficulty_sitting_long', label: 'Difficulty Sitting for Long Time (Postural Strain Syndrome)', isPhysioRelated: true },
  { id: 'trouble_climbing_stairs', label: 'Trouble Climbing Stairs (Functional Knee Dysfunction)', isPhysioRelated: true },
  { id: 'difficulty_getting_up', label: 'Difficulty Getting Up (Functional Mobility Impairment)', isPhysioRelated: true },
  { id: 'reduced_flexibility', label: 'Reduced Flexibility (Soft Tissue Tightness)', isPhysioRelated: true },
  { id: 'joint_locking', label: 'Joint Locking (Mechanical Joint Locking)', isPhysioRelated: true },
  { id: 'clicking_popping_joints', label: 'Clicking / Popping in Joints (Crepitus)', isPhysioRelated: true },
  { id: 'muscle_imbalance', label: 'Muscle Imbalance (Agonist–Antagonist Imbalance)', isPhysioRelated: true },
  { id: 'muscle_tightness', label: 'Muscle Tightness (Muscle Shortening)', isPhysioRelated: true },
  { id: 'muscle_spasm', label: 'Muscle Spasm (Involuntary Muscle Contraction)', isPhysioRelated: true },
  { id: 'delayed_onset_soreness', label: 'Delayed Onset Muscle Soreness (DOMS)', isPhysioRelated: true },
  { id: 'calf_pain_walking', label: 'Calf Pain While Walking (Intermittent Claudication)', isPhysioRelated: true },
  { id: 'weak_grip_strength', label: 'Weak Grip Strength (Reduced Hand Grip Strength)', isPhysioRelated: true },
  { id: 'difficulty_lifting', label: 'Difficulty Lifting Objects (Functional Weakness)', isPhysioRelated: true },
  { id: 'burning_sensation', label: 'Burning Sensation (Neuropathic Pain)', isPhysioRelated: true },
  { id: 'electric_shock_pain', label: 'Electric Shock-like Pain (Radicular Pain)', isPhysioRelated: true },
  { id: 'radiating_arm_pain', label: 'Radiating Arm Pain (Cervical Radiculopathy)', isPhysioRelated: true },
  { id: 'pinched_nerve', label: 'Pinched Nerve Sensation (Nerve Compression Syndrome)', isPhysioRelated: true },
  { id: 'loss_of_sensation', label: 'Loss of Sensation (Sensory Deficit)', isPhysioRelated: true },
  { id: 'foot_drop', label: 'Foot Drop (Peroneal Nerve Palsy)', isPhysioRelated: true },
  { id: 'hand_weakness', label: 'Hand Weakness (Motor Deficit)', isPhysioRelated: true },
  { id: 'ligament_injury', label: 'Ligament Injury (Ligament Tear / Sprain)', isPhysioRelated: true },
  { id: 'tendonitis', label: 'Tendonitis (Tendinopathy)', isPhysioRelated: true },
  { id: 'tennis_elbow', label: 'Tennis Elbow (Lateral Epicondylitis)', isPhysioRelated: true },
  { id: 'golfers_elbow', label: "Golfer's Elbow (Medial Epicondylitis)", isPhysioRelated: true },
  { id: 'shin_splints', label: 'Shin Splints (Medial Tibial Stress Syndrome)', isPhysioRelated: true },
  { id: 'runners_knee', label: "Runner's Knee (Patellofemoral Syndrome)", isPhysioRelated: true },
  { id: 'rotator_cuff_pain', label: 'Rotator Cuff Pain (Rotator Cuff Tear / Impingement)', isPhysioRelated: true },
  { id: 'heel_pain', label: 'Heel Pain (Plantar Fasciitis)', isPhysioRelated: true },
  { id: 'forward_head_posture', label: 'Forward Head Posture (Anterior Head Carriage)', isPhysioRelated: true },
  { id: 'rounded_shoulders', label: 'Rounded Shoulders (Scapular Protraction)', isPhysioRelated: true },
  { id: 'text_neck', label: 'Text Neck (Cervical Strain Syndrome)', isPhysioRelated: true },
  { id: 'lower_back_sitting', label: 'Lower Back Pain While Sitting (Discogenic Pain)', isPhysioRelated: true },
  { id: 'pain_screen_time', label: 'Pain After Long Screen Time (Postural Strain)', isPhysioRelated: true },
  { id: 'ergonomic_issues', label: 'Ergonomic Issues (Workplace Ergonomic Dysfunction)', isPhysioRelated: true },
  { id: 'difficulty_deep_breath', label: 'Difficulty Taking Deep Breath (Reduced Chest Expansion)', isPhysioRelated: true },
  { id: 'chest_tightness_musculoskeletal', label: 'Chest Tightness (Musculoskeletal Chest Pain)', isPhysioRelated: true },
  { id: 'post_covid_weakness', label: 'Post-COVID Weakness (Post-Viral Fatigue Syndrome)', isPhysioRelated: true },
  { id: 'reduced_lung_capacity', label: 'Reduced Lung Capacity (Restrictive Breathing Pattern)', isPhysioRelated: true },
  { id: 'fatigue_mild_activity', label: 'Fatigue After Mild Activity (Reduced Exercise Tolerance)', isPhysioRelated: true },
  { id: 'post_surgery_stiffness', label: 'Post-Surgery Stiffness (Post-Operative Joint Stiffness)', isPhysioRelated: true },
  { id: 'post_fracture_weakness', label: 'Post-Fracture Weakness (Post-Immobilization Weakness)', isPhysioRelated: true },
  { id: 'swelling_after_injury', label: 'Swelling After Injury (Edema)', isPhysioRelated: true },
  { id: 'loss_of_function', label: 'Loss of Function (Functional Impairment)', isPhysioRelated: true },
  { id: 'difficulty_returning_sport', label: 'Difficulty Returning to Sport (Return-to-Play Deficit)', isPhysioRelated: true },
  { id: 'balance_issues_injury', label: 'Balance Issues After Injury (Post-Injury Proprioceptive Loss)', isPhysioRelated: true },
  
  // General Symptoms
  { id: 'brain_fog', label: 'Brain Fog / Difficulty Concentrating', isPhysioRelated: false },
  { id: 'memory_loss', label: 'Memory Loss', isPhysioRelated: false },
  { id: 'tremors', label: 'Tremors / Shaking', isPhysioRelated: false },
  { id: 'confusion', label: 'Confusion', isPhysioRelated: false },
  { id: 'anxiety', label: 'Anxiety / Panic Attacks', isPhysioRelated: false },
  { id: 'mood_swings', label: 'Mood Swings / Irritability', isPhysioRelated: false },
  { id: 'depression', label: 'Depression / Low Mood', isPhysioRelated: false },
  { id: 'high_bp_symptoms', label: 'High Blood Pressure Symptoms', isPhysioRelated: false },
  { id: 'low_bp', label: 'Low Blood Pressure / Lightheadedness', isPhysioRelated: false },
  { id: 'chest_tightness', label: 'Chest Tightness', isPhysioRelated: false },
  { id: 'irregular_heartbeat', label: 'Irregular Heartbeat', isPhysioRelated: false },
  { id: 'palpitations', label: 'Heart Palpitations', isPhysioRelated: false },
  { id: 'chest_pain', label: 'Chest Pain', isPhysioRelated: false },
  { id: 'wheezing', label: 'Wheezing', isPhysioRelated: false },
  { id: 'phlegm', label: 'Phlegm / Mucus Build-up', isPhysioRelated: false },
  { id: 'dry_throat', label: 'Dry Throat', isPhysioRelated: false },
  { id: 'voice_hoarseness', label: 'Voice Hoarseness', isPhysioRelated: false },
  { id: 'cough', label: 'Cough', isPhysioRelated: false },
  { id: 'shortness_of_breath', label: 'Shortness of Breath', isPhysioRelated: false },
  { id: 'vomiting', label: 'Vomiting', isPhysioRelated: false },
  { id: 'indigestion', label: 'Indigestion', isPhysioRelated: false },
  { id: 'loss_of_taste', label: 'Loss of Taste', isPhysioRelated: false },
  { id: 'difficulty_swallowing', label: 'Difficulty Swallowing', isPhysioRelated: false },
  { id: 'dark_stool', label: 'Dark / Black Stool', isPhysioRelated: false },
  { id: 'excess_burping', label: 'Excess Burping', isPhysioRelated: false },
  { id: 'abdominal_pain', label: 'Abdominal Pain', isPhysioRelated: false },
  { id: 'bloating', label: 'Bloating / Gas', isPhysioRelated: false },
  { id: 'diarrhea', label: 'Diarrhoea', isPhysioRelated: false },
  { id: 'constipation', label: 'Constipation', isPhysioRelated: false },
  { id: 'heartburn', label: 'Heartburn / Acid Reflux', isPhysioRelated: false },
  { id: 'loss_of_appetite', label: 'Loss of Appetite', isPhysioRelated: false },
  { id: 'nausea', label: 'Nausea', isPhysioRelated: false },
  { id: 'acne', label: 'Acne / Pimples', isPhysioRelated: false },
  { id: 'dry_skin', label: 'Dry Skin', isPhysioRelated: false },
  { id: 'hair_loss', label: 'Hair Loss / Hair Thinning', isPhysioRelated: false },
  { id: 'dandruff', label: 'Dandruff', isPhysioRelated: false },
  { id: 'skin_discoloration', label: 'Skin Discoloration / Dark Spots', isPhysioRelated: false },
  { id: 'skin_rash', label: 'Skin Rash / Itching', isPhysioRelated: false },
  { id: 'daytime_sleepiness', label: 'Daytime Sleepiness', isPhysioRelated: false },
  { id: 'snoring', label: 'Snoring', isPhysioRelated: false },
  { id: 'night_sweats', label: 'Night Sweats', isPhysioRelated: false },
  { id: 'lack_of_energy', label: 'Lack of Energy', isPhysioRelated: false },
  { id: 'insomnia', label: 'Insomnia / Poor Sleep', isPhysioRelated: false },
  { id: 'fatigue', label: 'Fatigue', isPhysioRelated: false },
  { id: 'irregular_periods', label: 'Irregular Periods', isPhysioRelated: false },
  { id: 'missed_period', label: 'Missed Period', isPhysioRelated: false },
  { id: 'hot_flashes', label: 'Hot Flashes', isPhysioRelated: false },
  { id: 'low_libido', label: 'Low Libido', isPhysioRelated: false },
  { id: 'weight_loss', label: 'Unexplained Weight Loss', isPhysioRelated: false },
  { id: 'excessive_sweating', label: 'Excessive Sweating', isPhysioRelated: false },
  { id: 'frequent_urination', label: 'Frequent Urination', isPhysioRelated: false },
  { id: 'fever', label: 'Fever', isPhysioRelated: false },
  { id: 'headache', label: 'Headache', isPhysioRelated: false },
  { id: 'dizziness', label: 'Dizziness', isPhysioRelated: false },
  { id: 'swollen_lymph_nodes', label: 'Swollen Lymph Nodes', isPhysioRelated: false },
  { id: 'cold_hands_feet', label: 'Cold Hands / Feet', isPhysioRelated: false },
  { id: 'sinus_pressure', label: 'Sinus Pressure / Pain', isPhysioRelated: false },
  { id: 'nosebleeds', label: 'Nosebleeds', isPhysioRelated: false },
  { id: 'dry_eyes', label: 'Dry Eyes', isPhysioRelated: false },
  { id: 'light_sensitivity', label: 'Sensitivity to Light', isPhysioRelated: false },
  { id: 'runny_nose', label: 'Runny / Blocked Nose', isPhysioRelated: false },
  { id: 'ear_pain', label: 'Ear Pain / Ringing', isPhysioRelated: false },
  { id: 'sore_throat', label: 'Sore Throat', isPhysioRelated: false },
  { id: 'eye_strain', label: 'Eye Strain / Blurred Vision', isPhysioRelated: false },
  { id: 'blood_in_urine', label: 'Blood in Urine', isPhysioRelated: false },
  { id: 'blood_in_stool', label: 'Blood in Stool', isPhysioRelated: false },
  { id: 'severe_chest_pain', label: 'Severe Chest Pain', isPhysioRelated: false },
  { id: 'sudden_vision_loss', label: 'Sudden Vision Loss', isPhysioRelated: false },
  { id: 'fainting', label: 'Fainting / Blackout', isPhysioRelated: false },
  { id: 'seizures', label: 'Seizures', isPhysioRelated: false },
  { id: 'difficulty_speaking', label: 'Difficulty Speaking', isPhysioRelated: false },
];

export const conditions: Condition[] = [
  {
    label: 'Mechanical Low Back Pain',
    description: 'Non-specific lower back pain from muscle strain or poor posture',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.15,
    likelihoods: {
      lower_back_pain: 0.9,
      back_pain: 0.8,
      muscle_stiffness: 0.7,
      posture_problems: 0.6,
      pain_screen_time: 0.7,
      lower_back_sitting: 0.8,
      limited_range_of_motion: 0.5,
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
      neck_pain: 0.95,
      muscle_stiffness: 0.7,
      forward_head_posture: 0.8,
      text_neck: 0.85,
      pain_screen_time: 0.6,
      limited_range_of_motion: 0.6,
      headache: 0.4,
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
      shoulder_pain: 0.95,
      rotator_cuff_pain: 0.9,
      limited_range_of_motion: 0.8,
      muscle_weakness: 0.6,
      difficulty_lifting: 0.7,
      burning_sensation: 0.4,
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
      knee_pain: 0.95,
      runners_knee: 0.9,
      trouble_climbing_stairs: 0.8,
      muscle_weakness: 0.7,
      muscle_imbalance: 0.8,
      difficulty_walking: 0.5,
    },
  },
  {
    label: 'Plantar Fasciitis',
    description: 'Heel pain from inflammation of the plantar fascia',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.08,
    likelihoods: {
      heel_pain: 0.95,
      ankle_pain: 0.7,
      difficulty_walking: 0.6,
      reduced_flexibility: 0.5,
      calf_pain_walking: 0.4,
    },
  },
  {
    label: 'Carpal Tunnel Syndrome',
    description: 'Wrist pain and numbness from nerve compression',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.07,
    likelihoods: {
      wrist_pain: 0.9,
      numbness_tingling: 0.85,
      weak_grip_strength: 0.7,
      repetitive_strain: 0.8,
      burning_sensation: 0.5,
      hand_weakness: 0.6,
    },
  },
  {
    label: 'Sciatica',
    description: 'Radiating leg pain from sciatic nerve compression',
    specialist: 'Physiotherapist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.09,
    likelihoods: {
      sciatica: 0.95,
      radiating_arm_pain: 0.6,
      numbness_tingling: 0.7,
      leg_cramps: 0.6,
      difficulty_walking: 0.5,
      lower_back_pain: 0.7,
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
      muscle_stiffness: 0.85,
      muscle_spasm: 0.8,
      muscle_weakness: 0.6,
      sports_injury: 0.9,
      swelling_after_injury: 0.7,
      limited_range_of_motion: 0.7,
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
      posture_problems: 0.95,
      forward_head_posture: 0.85,
      rounded_shoulders: 0.8,
      neck_pain: 0.6,
      upper_back_pain: 0.7,
      muscle_imbalance: 0.85,
    },
  },
  {
    label: 'Osteoarthritis',
    description: 'Joint degeneration causing pain and stiffness',
    specialist: 'Rheumatologist',
    isPhysioRelevant: true,
    color: '#10b981',
    prior: 0.08,
    likelihoods: {
      joint_pain: 0.9,
      joint_swelling: 0.8,
      stiffness: 0.85,
      limited_range_of_motion: 0.8,
      clicking_popping_joints: 0.7,
      difficulty_walking: 0.6,
    },
  },
  {
    label: 'Migraine',
    description: 'Severe headache with neurological symptoms',
    specialist: 'Neurologist',
    isPhysioRelevant: false,
    prior: 0.06,
    likelihoods: {
      headache: 0.95,
      dizziness: 0.5,
      nausea: 0.6,
      light_sensitivity: 0.7,
      neck_pain: 0.3,
    },
  },
  {
    label: 'Anxiety Disorder',
    description: 'Persistent anxiety with physical symptoms',
    specialist: 'Psychiatrist',
    isPhysioRelevant: false,
    prior: 0.07,
    likelihoods: {
      anxiety: 0.95,
      chest_tightness: 0.7,
      palpitations: 0.6,
      shortness_of_breath: 0.5,
      dizziness: 0.4,
    },
  },
  {
    label: 'Hypertension',
    description: 'High blood pressure requiring medical management',
    specialist: 'Cardiologist',
    isPhysioRelevant: false,
    prior: 0.09,
    likelihoods: {
      high_bp_symptoms: 0.9,
      headache: 0.5,
      dizziness: 0.4,
      chest_pain: 0.3,
    },
  },
  {
    label: 'Asthma',
    description: 'Chronic respiratory condition with airway inflammation',
    specialist: 'Pulmonologist',
    isPhysioRelevant: false,
    prior: 0.05,
    likelihoods: {
      wheezing: 0.9,
      shortness_of_breath: 0.85,
      chest_tightness: 0.7,
      cough: 0.6,
      difficulty_deep_breath: 0.5,
    },
  },
  {
    label: 'Gastroesophageal Reflux Disease',
    description: 'Acid reflux causing heartburn and indigestion',
    specialist: 'Gastroenterologist',
    isPhysioRelevant: false,
    prior: 0.06,
    likelihoods: {
      heartburn: 0.95,
      indigestion: 0.85,
      nausea: 0.5,
      chest_pain: 0.4,
      difficulty_swallowing: 0.3,
    },
  },
  {
    label: 'Insomnia',
    description: 'Chronic sleep disorder affecting rest and recovery',
    specialist: 'Sleep Specialist',
    isPhysioRelevant: false,
    prior: 0.08,
    likelihoods: {
      insomnia: 0.95,
      daytime_sleepiness: 0.7,
      fatigue: 0.8,
      lack_of_energy: 0.7,
      mood_swings: 0.5,
    },
  },
  {
    label: 'Diabetes',
    description: 'Metabolic disorder affecting blood sugar regulation',
    specialist: 'Endocrinologist',
    isPhysioRelevant: false,
    prior: 0.07,
    likelihoods: {
      frequent_urination: 0.8,
      fatigue: 0.7,
      weight_loss: 0.5,
      numbness_tingling: 0.4,
      excessive_sweating: 0.3,
    },
  },
  {
    label: 'Thyroid Disorder',
    description: 'Thyroid dysfunction affecting metabolism',
    specialist: 'Endocrinologist',
    isPhysioRelevant: false,
    prior: 0.05,
    likelihoods: {
      fatigue: 0.8,
      weight_loss: 0.6,
      mood_swings: 0.5,
      cold_hands_feet: 0.6,
      hair_loss: 0.4,
    },
  },
  {
    label: 'Tension Headache',
    description: 'Headache from muscle tension, often stress-related',
    specialist: 'Neurologist',
    isPhysioRelevant: false,
    prior: 0.1,
    likelihoods: {
      headache: 0.95,
      neck_pain: 0.6,
      muscle_stiffness: 0.5,
      stress: 0.7,
      anxiety: 0.4,
    },
  },
  {
    label: 'Sinusitis',
    description: 'Sinus inflammation causing congestion and pain',
    specialist: 'ENT Specialist',
    isPhysioRelevant: false,
    prior: 0.06,
    likelihoods: {
      sinus_pressure: 0.95,
      headache: 0.8,
      runny_nose: 0.85,
      cough: 0.5,
      sore_throat: 0.4,
    },
  },
];

export interface SelfCareTip {
  icon: string;
  tip: string;
}

export const selfCareTips: Record<string, SelfCareTip[]> = {
  back_pain: [
    { icon: '❄️', tip: 'Apply ice for 15-20 minutes to reduce inflammation.' },
    { icon: '🛏️', tip: 'Rest on a firm surface with proper support.' },
    { icon: '🧘', tip: 'Perform gentle stretching exercises daily.' },
  ],
  lower_back_pain: [
    { icon: '❄️', tip: 'Use ice packs for acute pain relief.' },
    { icon: '🏃', tip: 'Avoid heavy lifting and bending.' },
    { icon: '🧘', tip: 'Practice core strengthening exercises.' },
  ],
  upper_back_pain: [
    { icon: '🔥', tip: 'Apply heat therapy for muscle relaxation.' },
    { icon: '💪', tip: 'Strengthen upper back with resistance exercises.' },
    { icon: '🪑', tip: 'Maintain proper sitting posture.' },
  ],
  neck_pain: [
    { icon: '🔥', tip: 'Use a heating pad for 15-20 minutes.' },
    { icon: '🧘', tip: 'Perform gentle neck stretches.' },
    { icon: '🪑', tip: 'Adjust monitor to eye level.' },
  ],
  shoulder_pain: [
    { icon: '❄️', tip: 'Ice for acute pain, heat for chronic stiffness.' },
    { icon: '💪', tip: 'Do rotator cuff strengthening exercises.' },
    { icon: '🧘', tip: 'Stretch shoulders regularly.' },
  ],
  knee_pain: [
    { icon: '❄️', tip: 'Apply ice after activity.' },
    { icon: '🏃', tip: 'Avoid high-impact activities temporarily.' },
    { icon: '💪', tip: 'Strengthen quadriceps and hamstrings.' },
  ],
  hip_pain: [
    { icon: '🔥', tip: 'Use heat therapy for muscle relaxation.' },
    { icon: '🧘', tip: 'Perform hip flexor and glute stretches.' },
    { icon: '🏃', tip: 'Avoid prolonged sitting.' },
  ],
  ankle_pain: [
    { icon: '❄️', tip: 'Ice and elevate the ankle.' },
    { icon: '🩹', tip: 'Use compression bandage for support.' },
    { icon: '🧘', tip: 'Do ankle mobility exercises.' },
  ],
  wrist_pain: [
    { icon: '🩹', tip: 'Wear a wrist brace for support.' },
    { icon: '🧘', tip: 'Perform wrist stretches regularly.' },
    { icon: '⏸️', tip: 'Take frequent breaks from repetitive tasks.' },
  ],
  muscle_stiffness: [
    { icon: '🔥', tip: 'Apply heat to loosen tight muscles.' },
    { icon: '🧘', tip: 'Stretch affected muscles gently.' },
    { icon: '🚶', tip: 'Move regularly to prevent stiffness.' },
  ],
  joint_swelling: [
    { icon: '❄️', tip: 'Apply ice to reduce swelling.' },
    { icon: '🩹', tip: 'Use compression bandage.' },
    { icon: '⬆️', tip: 'Elevate the joint above heart level.' },
  ],
  muscle_weakness: [
    { icon: '💪', tip: 'Start with gentle strengthening exercises.' },
    { icon: '🏃', tip: 'Gradually increase activity level.' },
    { icon: '🥗', tip: 'Ensure adequate protein intake.' },
  ],
  numbness_tingling: [
    { icon: '🧘', tip: 'Perform nerve gliding exercises.' },
    { icon: '🩹', tip: 'Avoid positions that compress nerves.' },
    { icon: '⏸️', tip: 'Take breaks from repetitive activities.' },
  ],
  limited_range_of_motion: [
    { icon: '🧘', tip: 'Do gentle stretching exercises daily.' },
    { icon: '🔥', tip: 'Use heat before stretching.' },
    { icon: '💪', tip: 'Gradually increase range with exercises.' },
  ],
  posture_problems: [
    { icon: '🪑', tip: 'Maintain neutral spine while sitting.' },
    { icon: '💪', tip: 'Strengthen core and back muscles.' },
    { icon: '🧘', tip: 'Stretch chest and hip flexors.' },
  ],
  sciatica: [
    { icon: '🧘', tip: 'Perform piriformis stretches.' },
    { icon: '🛏️', tip: 'Rest on a firm surface.' },
    { icon: '❄️', tip: 'Apply ice to reduce inflammation.' },
  ],
  sports_injury: [
    { icon: '❄️', tip: 'Apply RICE protocol (Rest, Ice, Compression, Elevation).' },
    { icon: '🏃', tip: 'Gradually return to activity.' },
    { icon: '💪', tip: 'Perform rehabilitation exercises.' },
  ],
  balance_issues: [
    { icon: '🧘', tip: 'Practice balance exercises daily.' },
    { icon: '🏃', tip: 'Do proprioceptive training.' },
    { icon: '🪑', tip: 'Use support when needed.' },
  ],
  repetitive_strain: [
    { icon: '⏸️', tip: 'Take frequent breaks from repetitive tasks.' },
    { icon: '🧘', tip: 'Stretch affected areas regularly.' },
    { icon: '🪑', tip: 'Optimize ergonomic setup.' },
  ],
  joint_pain: [
    { icon: '❄️', tip: 'Ice for acute pain.' },
    { icon: '🔥', tip: 'Heat for chronic stiffness.' },
    { icon: '🧘', tip: 'Gentle range of motion exercises.' },
  ],
  leg_cramps: [
    { icon: '🧘', tip: 'Stretch calf and hamstring muscles.' },
    { icon: '💧', tip: 'Stay well hydrated.' },
    { icon: '🥗', tip: 'Ensure adequate electrolytes.' },
  ],
  stiffness: [
    { icon: '🔥', tip: 'Apply heat to loosen muscles.' },
    { icon: '🧘', tip: 'Perform full-body stretching routine.' },
    { icon: '🚶', tip: 'Move regularly throughout the day.' },
  ],
  difficulty_walking: [
    { icon: '🏃', tip: 'Start with short walks on flat surfaces.' },
    { icon: '🪑', tip: 'Use assistive device if needed.' },
    { icon: '💪', tip: 'Strengthen legs with exercises.' },
  ],
  difficulty_standing_long: [
    { icon: '🪑', tip: 'Take sitting breaks regularly.' },
    { icon: '💪', tip: 'Strengthen leg muscles.' },
    { icon: '🧘', tip: 'Improve balance and stability.' },
  ],
  difficulty_sitting_long: [
    { icon: '🪑', tip: 'Change positions frequently.' },
    { icon: '🧘', tip: 'Stretch hip flexors regularly.' },
    { icon: '💪', tip: 'Strengthen core muscles.' },
  ],
  trouble_climbing_stairs: [
    { icon: '💪', tip: 'Strengthen quadriceps and glutes.' },
    { icon: '🧘', tip: 'Stretch leg muscles.' },
    { icon: '🏃', tip: 'Practice stair climbing gradually.' },
  ],
  difficulty_getting_up: [
    { icon: '💪', tip: 'Do leg strengthening exercises.' },
    { icon: '🧘', tip: 'Improve flexibility.' },
    { icon: '🪑', tip: 'Use armrests or support.' },
  ],
  reduced_flexibility: [
    { icon: '🧘', tip: 'Perform daily stretching routine.' },
    { icon: '🔥', tip: 'Use heat before stretching.' },
    { icon: '🏃', tip: 'Gradually increase range of motion.' },
  ],
  joint_locking: [
    { icon: '🧘', tip: 'Perform gentle joint mobilization.' },
    { icon: '💪', tip: 'Strengthen muscles around joint.' },
    { icon: '🏃', tip: 'Maintain regular movement.' },
  ],
  clicking_popping_joints: [
    { icon: '🧘', tip: 'Perform joint mobility exercises.' },
    { icon: '💪', tip: 'Strengthen surrounding muscles.' },
    { icon: '🏃', tip: 'Maintain regular activity.' },
  ],
  muscle_imbalance: [
    { icon: '💪', tip: 'Strengthen weaker muscle groups.' },
    { icon: '🧘', tip: 'Stretch tight muscles.' },
    { icon: '🏃', tip: 'Perform balanced exercises.' },
  ],
  muscle_tightness: [
    { icon: '🔥', tip: 'Apply heat therapy.' },
    { icon: '🧘', tip: 'Perform stretching exercises.' },
    { icon: '💆', tip: 'Consider massage therapy.' },
  ],
  muscle_spasm: [
    { icon: '🔥', tip: 'Apply heat to relax muscles.' },
    { icon: '🧘', tip: 'Gently stretch affected muscle.' },
    { icon: '💧', tip: 'Stay hydrated.' },
  ],
  delayed_onset_soreness: [
    { icon: '🔥', tip: 'Apply heat for comfort.' },
    { icon: '🧘', tip: 'Gentle stretching helps recovery.' },
    { icon: '🏃', tip: 'Light activity aids recovery.' },
  ],
  calf_pain_walking: [
    { icon: '🧘', tip: 'Stretch calf muscles regularly.' },
    { icon: '🏃', tip: 'Warm up before activity.' },
    { icon: '🪟', tip: 'Avoid prolonged standing.' },
  ],
  weak_grip_strength: [
    { icon: '💪', tip: 'Use grip strengthening exercises.' },
    { icon: '🏃', tip: 'Practice hand exercises daily.' },
    { icon: '🧘', tip: 'Stretch forearm muscles.' },
  ],
  difficulty_lifting: [
    { icon: '💪', tip: 'Strengthen arms and core.' },
    { icon: '🧘', tip: 'Improve flexibility.' },
    { icon: '🏃', tip: 'Gradually increase weight.' },
  ],
  burning_sensation: [
    { icon: '❄️', tip: 'Apply ice for temporary relief.' },
    { icon: '🧘', tip: 'Perform nerve gliding exercises.' },
    { icon: '⏸️', tip: 'Avoid aggravating activities.' },
  ],
  electric_shock_pain: [
    { icon: '🧘', tip: 'Perform nerve mobilization exercises.' },
    { icon: '🩹', tip: 'Avoid positions that trigger pain.' },
    { icon: '⏸️', tip: 'Take breaks from repetitive tasks.' },
  ],
  radiating_arm_pain: [
    { icon: '🧘', tip: 'Perform cervical stretches.' },
    { icon: '🩹', tip: 'Use proper posture.' },
    { icon: '❄️', tip: 'Apply ice if acute.' },
  ],
  pinched_nerve: [
    { icon: '🧘', tip: 'Perform nerve gliding exercises.' },
    { icon: '🩹', tip: 'Avoid positions that compress nerve.' },
    { icon: '🔥', tip: 'Apply heat for comfort.' },
  ],
  loss_of_sensation: [
    { icon: '🧘', tip: 'Perform sensory re-education exercises.' },
    { icon: '🏃', tip: 'Maintain regular movement.' },
    { icon: '💪', tip: 'Strengthen affected area.' },
  ],
  foot_drop: [
    { icon: '💪', tip: 'Perform ankle dorsiflexion exercises.' },
    { icon: '🩹', tip: 'Use ankle-foot orthosis if needed.' },
    { icon: '🏃', tip: 'Practice gait training.' },
  ],
  hand_weakness: [
    { icon: '💪', tip: 'Do hand strengthening exercises.' },
    { icon: '🧘', tip: 'Stretch hand and forearm muscles.' },
    { icon: '🏃', tip: 'Practice fine motor activities.' },
  ],
  ligament_injury: [
    { icon: '❄️', tip: 'Apply RICE protocol immediately.' },
    { icon: '🩹', tip: 'Use compression and support.' },
    { icon: '🏃', tip: 'Gradually return to activity.' },
  ],
  tendonitis: [
    { icon: '❄️', tip: 'Ice the affected area.' },
    { icon: '⏸️', tip: 'Rest from aggravating activities.' },
    { icon: '🧘', tip: 'Perform gentle stretches.' },
  ],
  tennis_elbow: [
    { icon: '❄️', tip: 'Apply ice after activity.' },
    { icon: '🩹', tip: 'Use elbow strap for support.' },
    { icon: '🧘', tip: 'Stretch forearm muscles.' },
  ],
  golfers_elbow: [
    { icon: '❄️', tip: 'Ice the inner elbow.' },
    { icon: '🩹', tip: 'Use compression support.' },
    { icon: '🧘', tip: 'Perform forearm stretches.' },
  ],
  shin_splints: [
    { icon: '❄️', tip: 'Apply ice to shin.' },
    { icon: '🏃', tip: 'Reduce running intensity.' },
    { icon: '🧘', tip: 'Stretch calf muscles.' },
  ],
  runners_knee: [
    { icon: '❄️', tip: 'Ice after running.' },
    { icon: '💪', tip: 'Strengthen quadriceps.' },
    { icon: '🧘', tip: 'Stretch leg muscles.' },
  ],
  rotator_cuff_pain: [
    { icon: '❄️', tip: 'Ice for acute pain.' },
    { icon: '💪', tip: 'Do rotator cuff exercises.' },
    { icon: '🧘', tip: 'Stretch shoulder muscles.' },
  ],
  heel_pain: [
    { icon: '🧘', tip: 'Stretch calf and plantar fascia.' },
    { icon: '🩹', tip: 'Use heel cups or inserts.' },
    { icon: '❄️', tip: 'Ice the heel.' },
  ],
  forward_head_posture: [
    { icon: '🪑', tip: 'Maintain neutral head position.' },
    { icon: '💪', tip: 'Strengthen neck and upper back.' },
    { icon: '🧘', tip: 'Stretch chest muscles.' },
  ],
  rounded_shoulders: [
    { icon: '💪', tip: 'Strengthen upper back muscles.' },
    { icon: '🧘', tip: 'Stretch chest and front shoulders.' },
    { icon: '🪑', tip: 'Maintain proper posture.' },
  ],
  text_neck: [
    { icon: '🪑', tip: 'Hold phone at eye level.' },
    { icon: '🧘', tip: 'Perform neck stretches.' },
    { icon: '⏸️', tip: 'Take breaks from phone use.' },
  ],
  lower_back_sitting: [
    { icon: '🪑', tip: 'Use lumbar support pillow.' },
    { icon: '⏸️', tip: 'Change positions frequently.' },
    { icon: '🧘', tip: 'Stretch hip flexors.' },
  ],
  pain_screen_time: [
    { icon: '🪑', tip: 'Adjust monitor to eye level.' },
    { icon: '⏸️', tip: 'Take 20-20-20 breaks.' },
    { icon: '🧘', tip: 'Stretch neck and shoulders.' },
  ],
  ergonomic_issues: [
    { icon: '🪑', tip: 'Optimize desk and chair setup.' },
    { icon: '⏸️', tip: 'Take regular movement breaks.' },
    { icon: '🧘', tip: 'Perform stretching exercises.' },
  ],
  difficulty_deep_breath: [
    { icon: '🧘', tip: 'Practice diaphragmatic breathing.' },
    { icon: '💪', tip: 'Strengthen respiratory muscles.' },
    { icon: '🏃', tip: 'Gradually increase activity.' },
  ],
  chest_tightness_musculoskeletal: [
    { icon: '🔥', tip: 'Apply heat to chest muscles.' },
    { icon: '🧘', tip: 'Stretch chest and shoulders.' },
    { icon: '💪', tip: 'Strengthen upper back.' },
  ],
  post_covid_weakness: [
    { icon: '🏃', tip: 'Gradually increase activity level.' },
    { icon: '💪', tip: 'Start gentle strengthening.' },
    { icon: '🛏️', tip: 'Ensure adequate rest.' },
  ],
  reduced_lung_capacity: [
    { icon: '🧘', tip: 'Practice breathing exercises.' },
    { icon: '🏃', tip: 'Gradually increase aerobic activity.' },
    { icon: '💪', tip: 'Strengthen respiratory muscles.' },
  ],
  fatigue_mild_activity: [
    { icon: '🛏️', tip: 'Ensure adequate sleep.' },
    { icon: '🏃', tip: 'Gradually increase activity.' },
    { icon: '🥗', tip: 'Maintain balanced nutrition.' },
  ],
  post_surgery_stiffness: [
    { icon: '🔥', tip: 'Apply heat before exercises.' },
    { icon: '🧘', tip: 'Perform prescribed stretches.' },
    { icon: '🏃', tip: 'Follow rehabilitation protocol.' },
  ],
  post_fracture_weakness: [
    { icon: '💪', tip: 'Start gentle strengthening.' },
    { icon: '🧘', tip: 'Improve flexibility gradually.' },
    { icon: '🏃', tip: 'Progress activity as tolerated.' },
  ],
  swelling_after_injury: [
    { icon: '❄️', tip: 'Apply ice regularly.' },
    { icon: '🩹', tip: 'Use compression bandage.' },
    { icon: '⬆️', tip: 'Elevate injured area.' },
  ],
  loss_of_function: [
    { icon: '💪', tip: 'Perform targeted exercises.' },
    { icon: '🏃', tip: 'Gradually restore function.' },
    { icon: '🧘', tip: 'Improve flexibility and strength.' },
  ],
  difficulty_returning_sport: [
    { icon: '🏃', tip: 'Follow return-to-sport protocol.' },
    { icon: '💪', tip: 'Complete strength training.' },
    { icon: '🧘', tip: 'Improve sport-specific skills.' },
  ],
  balance_issues_injury: [
    { icon: '🧘', tip: 'Practice balance exercises.' },
    { icon: '🏃', tip: 'Do proprioceptive training.' },
    { icon: '🪑', tip: 'Use support as needed.' },
  ],
  dandruff: [
    { icon: '🧴', tip: 'Use anti-dandruff shampoo 2-3 times weekly.' },
    { icon: '🧘', tip: 'Massage scalp gently while shampooing.' },
    { icon: '💧', tip: 'Avoid hot water—use lukewarm water.' },
  ],
  memory_loss: [
    { icon: '🧠', tip: 'Engage in cognitive exercises.' },
    { icon: '🛏️', tip: 'Ensure adequate sleep.' },
    { icon: '🏃', tip: 'Regular physical activity helps cognition.' },
  ],
  tremors: [
    { icon: '🧘', tip: 'Practice relaxation techniques.' },
    { icon: '🏃', tip: 'Regular exercise may help.' },
    { icon: '⏸️', tip: 'Avoid caffeine and stress.' },
  ],
  confusion: [
    { icon: '🧘', tip: 'Practice mindfulness.' },
    { icon: '🛏️', tip: 'Ensure adequate rest.' },
    { icon: '💧', tip: 'Stay well hydrated.' },
  ],
  anxiety: [
    { icon: '🧘', tip: 'Practice deep breathing exercises.' },
    { icon: '🏃', tip: 'Regular exercise reduces anxiety.' },
    { icon: '🧠', tip: 'Try meditation or mindfulness.' },
  ],
  mood_swings: [
    { icon: '🧘', tip: 'Practice stress management.' },
    { icon: '🏃', tip: 'Regular exercise stabilizes mood.' },
    { icon: '🛏️', tip: 'Maintain consistent sleep schedule.' },
  ],
  depression: [
    { icon: '🏃', tip: 'Regular exercise is beneficial.' },
    { icon: '🧘', tip: 'Practice mindfulness.' },
    { icon: '👥', tip: 'Seek social support.' },
  ],
  high_bp_symptoms: [
    { icon: '🧘', tip: 'Practice relaxation techniques.' },
    { icon: '🏃', tip: 'Regular aerobic exercise helps.' },
    { icon: '🥗', tip: 'Reduce sodium intake.' },
  ],
  low_bp: [
    { icon: '💧', tip: 'Stay well hydrated.' },
    { icon: '🪑', tip: 'Rise slowly from sitting.' },
    { icon: '🥗', tip: 'Increase salt intake slightly.' },
  ],
  chest_tightness: [
    { icon: '🧘', tip: 'Practice deep breathing.' },
    { icon: '🏃', tip: 'Gentle exercise may help.' },
    { icon: '⏸️', tip: 'Avoid stress triggers.' },
  ],
  irregular_heartbeat: [
    { icon: '🧘', tip: 'Practice relaxation techniques.' },
    { icon: '⏸️', tip: 'Avoid caffeine and stimulants.' },
    { icon: '🛏️', tip: 'Ensure adequate rest.' },
  ],
  palpitations: [
    { icon: '🧘', tip: 'Practice deep breathing.' },
    { icon: '⏸️', tip: 'Reduce caffeine intake.' },
    { icon: '🏃', tip: 'Regular moderate exercise.' },
  ],
  wheezing: [
    { icon: '🧘', tip: 'Practice breathing exercises.' },
    { icon: '⏸️', tip: 'Avoid respiratory irritants.' },
    { icon: '💧', tip: 'Stay hydrated.' },
  ],
  phlegm: [
    { icon: '💧', tip: 'Drink plenty of water.' },
    { icon: '🧘', tip: 'Use steam inhalation.' },
    { icon: '⏸️', tip: 'Avoid irritants.' },
  ],
  voice_hoarseness: [
    { icon: '💧', tip: 'Stay well hydrated.' },
    { icon: '⏸️', tip: 'Rest your voice.' },
    { icon: '🧘', tip: 'Use steam inhalation.' },
  ],
  loss_of_taste: [
    { icon: '🧘', tip: 'Practice taste exercises.' },
    { icon: '🥗', tip: 'Eat varied foods.' },
    { icon: '💧', tip: 'Stay hydrated.' },
  ],
  difficulty_swallowing: [
    { icon: '🧘', tip: 'Practice swallowing exercises.' },
    { icon: '💧', tip: 'Drink plenty of water.' },
    { icon: '🥗', tip: 'Eat soft foods.' },
  ],
  dark_stool: [
    { icon: '🥗', tip: 'Increase fiber intake gradually.' },
    { icon: '💧', tip: 'Stay well hydrated.' },
    { icon: '⏸️', tip: 'Avoid iron supplements if possible.' },
  ],
  excess_burping: [
    { icon: '🥗', tip: 'Eat slowly and chew well.' },
    { icon: '⏸️', tip: 'Avoid carbonated drinks.' },
    { icon: '🧘', tip: 'Practice relaxation after meals.' },
  ],
  lack_of_energy: [
    { icon: '🛏️', tip: 'Ensure adequate sleep.' },
    { icon: '🏃', tip: 'Regular exercise boosts energy.' },
    { icon: '🥗', tip: 'Eat balanced meals.' },
  ],
  low_libido: [
    { icon: '🏃', tip: 'Regular exercise helps.' },
    { icon: '🧘', tip: 'Reduce stress.' },
    { icon: '🛏️', tip: 'Ensure adequate rest.' },
  ],
  skin_discoloration: [
    { icon: '☀️', tip: 'Use sunscreen daily.' },
    { icon: '🧴', tip: 'Use skin lightening products.' },
    { icon: '🧘', tip: 'Protect skin from sun.' },
  ],
  dry_eyes: [
    { icon: '💧', tip: 'Use artificial tears.' },
    { icon: '⏸️', tip: 'Take breaks from screens.' },
    { icon: '🧘', tip: 'Blink exercises help.' },
  ],
  light_sensitivity: [
    { icon: '🕶️', tip: 'Wear sunglasses outdoors.' },
    { icon: '⏸️', tip: 'Reduce screen brightness.' },
    { icon: '🧘', tip: 'Take breaks from bright light.' },
  ],
  blood_in_urine: [
    { icon: '💧', tip: 'Stay well hydrated.' },
    { icon: '⏸️', tip: 'Avoid strenuous activity.' },
    { icon: '🧘', tip: 'Practice relaxation.' },
  ],
  blood_in_stool: [
    { icon: '🥗', tip: 'Increase fiber intake.' },
    { icon: '💧', tip: 'Stay hydrated.' },
    { icon: '⏸️', tip: 'Avoid straining.' },
  ],
  sudden_vision_loss: [
    { icon: '🧘', tip: 'Remain calm and still.' },
    { icon: '⏸️', tip: 'Avoid sudden movements.' },
    { icon: '🕶️', tip: 'Protect eyes from light.' },
  ],
  seizures: [
    { icon: '🧘', tip: 'Practice stress management.' },
    { icon: '🛏️', tip: 'Maintain regular sleep.' },
    { icon: '⏸️', tip: 'Avoid known triggers.' },
  ],
  difficulty_speaking: [
    { icon: '🧘', tip: 'Practice speech exercises.' },
    { icon: '💧', tip: 'Stay hydrated.' },
    { icon: '⏸️', tip: 'Take breaks when speaking.' },
  ],

  // ── Neurological / Mental ──────────────────────────────────────────────────
  brain_fog: [
    { icon: '😴', tip: 'Prioritise 7–9 hours of quality sleep each night.' },
    { icon: '💧', tip: 'Drink at least 2 litres of water daily — dehydration worsens fog.' },
    { icon: '🚶', tip: 'Take a 10-minute walk; light movement boosts blood flow to the brain.' },
  ],

  // ── Cardiovascular ────────────────────────────────────────────────────────
  chest_pain: [
    { icon: '🛑', tip: 'Stop all physical activity immediately and rest.' },
    { icon: '🧘', tip: 'Sit upright and breathe slowly and deeply.' },
    { icon: '📞', tip: 'If pain persists more than 5 minutes, call emergency services.' },
  ],
  severe_chest_pain: [
    { icon: '🚨', tip: 'Call emergency services (112/911) immediately — do not wait.' },
    { icon: '🛑', tip: 'Stop all activity and sit or lie down in a comfortable position.' },
    { icon: '💊', tip: 'If prescribed, take aspirin (325 mg) while waiting for help.' },
  ],

  // ── Respiratory ───────────────────────────────────────────────────────────
  dry_throat: [
    { icon: '💧', tip: 'Sip warm water or herbal tea frequently.' },
    { icon: '🍯', tip: 'Mix honey in warm water — it soothes throat irritation.' },
    { icon: '💨', tip: 'Use a humidifier to add moisture to dry indoor air.' },
  ],
  cough: [
    { icon: '🍯', tip: 'Take a teaspoon of honey to soothe the throat.' },
    { icon: '💧', tip: 'Stay well hydrated to thin mucus secretions.' },
    { icon: '🌿', tip: 'Inhale steam with a few drops of eucalyptus oil for relief.' },
  ],
  shortness_of_breath: [
    { icon: '🧘', tip: 'Sit upright and practice pursed-lip breathing: inhale 2s, exhale 4s.' },
    { icon: '🌬️', tip: 'Open a window or step outside for fresh air.' },
    { icon: '⏸️', tip: 'Stop any exertion immediately and rest until breathing normalises.' },
  ],

  // ── Digestive ─────────────────────────────────────────────────────────────
  vomiting: [
    { icon: '💧', tip: 'Sip small amounts of clear fluids (water, ORS) to prevent dehydration.' },
    { icon: '🍚', tip: 'Once settled, eat bland foods: rice, toast, banana.' },
    { icon: '⏸️', tip: 'Rest and avoid solid food for 1–2 hours after vomiting.' },
  ],
  indigestion: [
    { icon: '🚶', tip: 'Take a gentle 10-minute walk after meals to aid digestion.' },
    { icon: '🍵', tip: 'Drink ginger or peppermint tea to ease discomfort.' },
    { icon: '🪑', tip: 'Avoid lying down for at least 2 hours after eating.' },
  ],
  abdominal_pain: [
    { icon: '🔥', tip: 'Apply a warm compress or heating pad to the abdomen.' },
    { icon: '🧘', tip: 'Lie on your side with knees drawn up to relieve cramping.' },
    { icon: '🍵', tip: 'Sip warm chamomile or peppermint tea for muscle relaxation.' },
  ],
  bloating: [
    { icon: '🚶', tip: 'Walk for 15 minutes after meals to stimulate digestion.' },
    { icon: '🍵', tip: 'Drink fennel or peppermint tea to reduce gas.' },
    { icon: '⏸️', tip: 'Avoid carbonated drinks and gas-producing foods temporarily.' },
  ],
  diarrhea: [
    { icon: '💧', tip: 'Drink ORS (oral rehydration solution) to replace lost fluids and salts.' },
    { icon: '🍌', tip: 'Follow the BRAT diet: Banana, Rice, Applesauce, Toast.' },
    { icon: '⏸️', tip: 'Avoid dairy, fatty foods, and caffeine until symptoms resolve.' },
  ],
  constipation: [
    { icon: '💧', tip: 'Drink 8–10 glasses of water daily to soften stools.' },
    { icon: '🥦', tip: 'Increase fibre intake: fruits, vegetables, whole grains.' },
    { icon: '🚶', tip: 'Walk or exercise for 20–30 minutes to stimulate bowel movement.' },
  ],
  heartburn: [
    { icon: '🪑', tip: 'Sit upright for at least 2 hours after eating.' },
    { icon: '🥛', tip: 'Drink a small glass of cold milk for temporary relief.' },
    { icon: '⏸️', tip: 'Avoid spicy, fatty, and acidic foods until symptoms ease.' },
  ],
  loss_of_appetite: [
    { icon: '🍽️', tip: 'Eat small, frequent meals rather than large ones.' },
    { icon: '🍋', tip: 'Try light, easy-to-digest foods like soups, fruits, and yoghurt.' },
    { icon: '🚶', tip: 'Light exercise before meals can stimulate appetite.' },
  ],
  nausea: [
    { icon: '🫚', tip: 'Sniff or chew fresh ginger — it is a proven anti-nausea remedy.' },
    { icon: '💧', tip: 'Sip cold water or clear fluids slowly.' },
    { icon: '🌬️', tip: 'Get fresh air and breathe slowly through your nose.' },
  ],

  // ── Skin / Hair ───────────────────────────────────────────────────────────
  acne: [
    { icon: '🧼', tip: 'Wash your face twice daily with a gentle, non-comedogenic cleanser.' },
    { icon: '🙅', tip: 'Avoid touching or picking at spots to prevent scarring.' },
    { icon: '💧', tip: 'Stay hydrated and reduce sugar and dairy intake temporarily.' },
  ],
  dry_skin: [
    { icon: '🧴', tip: 'Apply a fragrance-free moisturiser immediately after bathing.' },
    { icon: '💧', tip: 'Drink plenty of water and use a humidifier indoors.' },
    { icon: '🚿', tip: 'Use lukewarm (not hot) water when bathing to prevent moisture loss.' },
  ],
  hair_loss: [
    { icon: '🥗', tip: 'Ensure adequate protein, iron, and zinc in your diet.' },
    { icon: '💆', tip: 'Gently massage the scalp for 5 minutes daily to improve circulation.' },
    { icon: '⏸️', tip: 'Avoid tight hairstyles and excessive heat styling.' },
  ],
  skin_rash: [
    { icon: '❄️', tip: 'Apply a cool, damp cloth to the rash to reduce itching.' },
    { icon: '🧴', tip: 'Use a fragrance-free, hypoallergenic moisturiser.' },
    { icon: '🙅', tip: 'Avoid scratching — it worsens irritation and risks infection.' },
  ],

  // ── Sleep / Lifestyle ─────────────────────────────────────────────────────
  daytime_sleepiness: [
    { icon: '😴', tip: 'Aim for a consistent sleep schedule — same bedtime and wake time daily.' },
    { icon: '☀️', tip: 'Get bright natural light exposure in the morning to reset your body clock.' },
    { icon: '⏸️', tip: 'Limit caffeine after 2 pm and avoid screens 1 hour before bed.' },
  ],
  snoring: [
    { icon: '🛏️', tip: 'Sleep on your side rather than your back to reduce airway obstruction.' },
    { icon: '💧', tip: 'Stay well hydrated — dehydration thickens nasal secretions.' },
    { icon: '🏃', tip: 'Maintain a healthy weight; excess weight around the neck worsens snoring.' },
  ],
  night_sweats: [
    { icon: '🌡️', tip: 'Keep your bedroom cool (16–18°C) and use breathable cotton bedding.' },
    { icon: '🚿', tip: 'Take a cool shower before bed to lower core body temperature.' },
    { icon: '⏸️', tip: 'Avoid alcohol, spicy food, and caffeine in the evening.' },
  ],
  insomnia: [
    { icon: '📵', tip: 'Avoid screens (phone, TV) for at least 1 hour before bed.' },
    { icon: '🧘', tip: 'Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.' },
    { icon: '🛏️', tip: 'Use your bed only for sleep — avoid working or watching TV in bed.' },
  ],
  fatigue: [
    { icon: '😴', tip: 'Prioritise 7–9 hours of uninterrupted sleep.' },
    { icon: '🥗', tip: 'Eat balanced meals with iron-rich foods: spinach, lentils, red meat.' },
    { icon: '🚶', tip: 'Light exercise like a 20-minute walk can paradoxically boost energy.' },
  ],

  // ── Hormonal / General ────────────────────────────────────────────────────
  irregular_periods: [
    { icon: '🧘', tip: 'Manage stress through yoga, meditation, or deep breathing.' },
    { icon: '🥗', tip: 'Maintain a balanced diet and healthy body weight.' },
    { icon: '⏸️', tip: 'Avoid excessive exercise which can disrupt hormonal balance.' },
  ],
  missed_period: [
    { icon: '🧘', tip: 'Reduce stress — high cortisol can suppress ovulation.' },
    { icon: '🥗', tip: 'Ensure adequate caloric intake; under-eating disrupts cycles.' },
    { icon: '📋', tip: 'Track your cycle and note any other symptoms for your doctor.' },
  ],
  hot_flashes: [
    { icon: '🌡️', tip: 'Dress in light, breathable layers you can easily remove.' },
    { icon: '💧', tip: 'Carry cold water and sip frequently throughout the day.' },
    { icon: '⏸️', tip: 'Avoid triggers: spicy food, caffeine, alcohol, and hot beverages.' },
  ],
  weight_loss: [
    { icon: '🥗', tip: 'Eat calorie-dense, nutritious foods: nuts, avocado, whole grains.' },
    { icon: '🍽️', tip: 'Eat 5–6 small meals per day rather than 3 large ones.' },
    { icon: '📋', tip: 'Keep a food diary and share it with your doctor.' },
  ],
  excessive_sweating: [
    { icon: '🚿', tip: 'Shower regularly and use an antiperspirant (not just deodorant).' },
    { icon: '👕', tip: 'Wear loose, breathable, moisture-wicking fabrics.' },
    { icon: '💧', tip: 'Stay hydrated to help regulate body temperature.' },
  ],
  frequent_urination: [
    { icon: '⏸️', tip: 'Reduce caffeine and alcohol — both are bladder irritants.' },
    { icon: '🧘', tip: 'Practice pelvic floor exercises (Kegels) to improve bladder control.' },
    { icon: '📋', tip: 'Track fluid intake and urination frequency to share with your doctor.' },
  ],
  fever: [
    { icon: '💧', tip: 'Drink plenty of fluids to prevent dehydration.' },
    { icon: '🌡️', tip: 'Apply a cool, damp cloth to the forehead and wrists.' },
    { icon: '🛏️', tip: 'Rest and avoid strenuous activity until fever subsides.' },
  ],
  headache: [
    { icon: '💧', tip: 'Drink a full glass of water — dehydration is a common trigger.' },
    { icon: '🌑', tip: 'Rest in a quiet, dark room and close your eyes.' },
    { icon: '❄️', tip: 'Apply a cold or warm compress to the forehead or neck.' },
  ],
  dizziness: [
    { icon: '🪑', tip: 'Sit or lie down immediately to prevent falling.' },
    { icon: '💧', tip: 'Sip water slowly — dizziness is often caused by dehydration.' },
    { icon: '🚶', tip: 'Move slowly when changing positions (lying → sitting → standing).' },
  ],
  swollen_lymph_nodes: [
    { icon: '🔥', tip: 'Apply a warm compress to the swollen area for comfort.' },
    { icon: '😴', tip: 'Rest and allow your immune system to fight the underlying cause.' },
    { icon: '⏸️', tip: 'Avoid pressing or squeezing the nodes.' },
  ],
  cold_hands_feet: [
    { icon: '🧤', tip: 'Wear warm socks and gloves; layer up in cold environments.' },
    { icon: '🚶', tip: 'Exercise regularly to improve circulation.' },
    { icon: '⏸️', tip: 'Avoid smoking and caffeine which constrict blood vessels.' },
  ],

  // ── ENT ───────────────────────────────────────────────────────────────────
  sinus_pressure: [
    { icon: '🌿', tip: 'Inhale steam for 10 minutes — add eucalyptus oil for extra relief.' },
    { icon: '💧', tip: 'Use a saline nasal rinse to clear congestion.' },
    { icon: '🔥', tip: 'Apply a warm compress over the nose and forehead.' },
  ],
  nosebleeds: [
    { icon: '🤏', tip: 'Pinch the soft part of your nose and lean slightly forward for 10 minutes.' },
    { icon: '❄️', tip: 'Apply a cold compress to the bridge of the nose.' },
    { icon: '💧', tip: 'Use a saline nasal spray to keep nasal passages moist.' },
  ],
  runny_nose: [
    { icon: '🌿', tip: 'Inhale steam to loosen congestion.' },
    { icon: '💧', tip: 'Use a saline nasal spray to flush out irritants.' },
    { icon: '🍵', tip: 'Drink warm fluids like ginger tea to soothe nasal passages.' },
  ],
  ear_pain: [
    { icon: '🔥', tip: 'Apply a warm compress or heating pad over the ear.' },
    { icon: '🧘', tip: 'Try the Valsalva manoeuvre: close mouth, pinch nose, gently blow.' },
    { icon: '⏸️', tip: 'Avoid inserting anything into the ear canal.' },
  ],
  sore_throat: [
    { icon: '🧂', tip: 'Gargle with warm salt water (1/2 tsp salt in 250ml water) every few hours.' },
    { icon: '🍯', tip: 'Mix honey and lemon in warm water — both have soothing properties.' },
    { icon: '❄️', tip: 'Suck on ice chips or a cold popsicle to numb the pain.' },
  ],
  eye_strain: [
    { icon: '👁️', tip: 'Follow the 20-20-20 rule: every 20 min, look 20 feet away for 20 seconds.' },
    { icon: '💧', tip: 'Use lubricating eye drops to relieve dryness.' },
    { icon: '🌑', tip: 'Reduce screen brightness and enable night mode.' },
  ],
  fainting: [
    { icon: '🛏️', tip: 'Lie flat and elevate your legs above heart level to restore blood flow.' },
    { icon: '💧', tip: 'Sip water slowly once conscious — dehydration is a common cause.' },
    { icon: '🌬️', tip: 'Get fresh air and loosen any tight clothing around the neck.' },
  ],
};

interface DiagnosisResult {
  condition: string;
  description: string;
  specialist: string;
  isPhysioRelevant: boolean;
  probability: number;
  color: string;
  rank: number;
  percentageProbability: number;
}

interface CareTip {
  symptomLabel: string;
  tips: Array<{ icon: string; tip: string }>;
}

export function runBayesianDiagnosis(selectedSymptomIds: string[]): DiagnosisResult[] {
  if (selectedSymptomIds.length === 0) {
    return [];
  }

  const results = conditions.map(condition => {
    let likelihood = condition.prior;
    
    for (const symptomId of selectedSymptomIds) {
      const symptomLikelihood = condition.likelihoods[symptomId] || 0.1;
      likelihood *= symptomLikelihood;
    }
    
    return {
      condition: condition.label,
      description: condition.description,
      specialist: condition.specialist,
      isPhysioRelevant: condition.isPhysioRelevant,
      probability: likelihood,
      color: condition.color || '#6366f1',
    };
  });

  return results
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 5)
    .map((result, index) => ({
      ...result,
      rank: index + 1,
      percentageProbability: Math.round(result.probability * 100),
    }));
}

export function getSelfCareTips(selectedSymptomIds: string[]): CareTip[] {
  return selectedSymptomIds
    .filter(id => selfCareTips[id])
    .map(id => ({
      symptomLabel: symptoms.find(s => s.id === id)?.label || id,
      tips: selfCareTips[id],
    }));
}
