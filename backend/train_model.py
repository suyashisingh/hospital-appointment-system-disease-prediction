import pandas as pd
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.tree import DecisionTreeClassifier

# Load training data from CSV
df = pd.read_csv('training_data.csv')

# Extract features and labels
symptoms = df['Symptoms'].values
diseases = df['Disease'].values

# Convert symptoms text to numeric features
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(symptoms)

# Train the decision tree classifier
clf = DecisionTreeClassifier()
clf.fit(X, diseases)

# Save the vectorizer and trained model to a file
with open('model.pkl', 'wb') as f:
    pickle.dump((vectorizer, clf), f)

print("Training complete. Model saved as model.pkl")
