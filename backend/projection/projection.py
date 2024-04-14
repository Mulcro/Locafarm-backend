# This Python 3 environment comes with many helpful analytics libraries installed
# It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# For example, here's several helpful packages to load

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

# Input data files are available in the read-only "../input/" directory
# For example, running this (by clicking run or pressing Shift+Enter) will list all files under the input directory

import os
for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))

# You can write up to 20GB to the current directory (/kaggle/working/) that gets preserved as output when you create a version using "Save & Run All" 
# You can also write temporary files to /kaggle/temp/, but they won't be saved outside of the current 
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
warnings.simplefilter(action='ignore', category=UserWarning)
import seaborn as sns
import matplotlib.pyplot as plt

root_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the file path relative to the root directory
file_path = os.path.join(root_dir, 'Crop_recommendation.csv')

# Load the CSV file using the constructed file path
df = pd.read_csv(file_path)
df.head()
df.describe()
sns.heatmap(df.isnull(),cmap="coolwarm")

c=df.label.astype('category')
targets = dict(enumerate(c.cat.categories))
df['target']=c.cat.codes

y=df.target
X=df[['N','P','K','temperature','humidity','ph','rainfall']]
sns.heatmap(X.corr())
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler

X_train, X_test, y_train, y_test = train_test_split(X, y,random_state=1)

scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train)

# we must apply the scaling to the test set as well that we are computing for the training set
X_test_scaled = scaler.transform(X_test)

from sklearn.ensemble import RandomForestClassifier
clf = RandomForestClassifier(max_depth=4,n_estimators=100,random_state=42).fit(X_train, y_train)

print('RF Accuracy on training set: {:.2f}'.format(clf.score(X_train, y_train)))
print('RF Accuracy on test set: {:.2f}'.format(clf.score(X_test, y_test)))

import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from joblib import load  # Use joblib to load the model and preprocessing transformers

# Preprocess the data
c = df.label.astype('category')
targets = dict(enumerate(c.cat.categories))
df['target'] = c.cat.codes
y = df.target
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
X_scaled = scaler.transform(X)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, random_state=1)

# Train the Random Forest model
clf = RandomForestClassifier(max_depth=4, n_estimators=100, random_state=42).fit(X_train, y_train)

# Define the prediction function
def predict_crop(ph, temperature, humidity, rainfall, N, P, K):
    # Create a DataFrame with input parameters
    input_data = pd.DataFrame({'N': [N], 'P': [P], 'K': [K],'temperature': [temperature], 'humidity': [humidity],'ph': [ph], 'rainfall': [rainfall]})
    
    # Scale the input features
    input_scaled = scaler.transform(input_data)

    # Make predictions using the loaded model
    predicted_crop_code = clf.predict(input_scaled)[0]
    predicted_crop = targets.get(predicted_crop_code, 'Unknown Crop')

    return predicted_crop;

# Example usage
ph_value = 3
temperature_value = 20
humidity_value = 10
rainFall_value = 200
N_value = 100
P_value = 50
K_value = 100


predicted_crop = predict_crop(ph_value, temperature_value, humidity_value, rainFall_value, N_value, P_value, K_value)
print('Predicted crop:', predicted_crop)
