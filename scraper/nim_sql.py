import mysql.connector

"""
    jur = '19917184, 15417082 : Iqbal Hakim Ardiansyah'
    tpb = '19918001 : Cecilia Nonifili Yuanita'

    jur_list = [x.strip() for x in jur.split(':')[0].split(',')] + [jur.split(':')[1].strip()]
    print(jur_list)

    tpb_list = [x.strip() for x in tpb.split(':')[0].split(',')] + [tpb.split(':')[1].strip()]
    print(tpb_list)
"""

conn = mysql.connector.connect(
    user='', #sql user
    password= '', #sql user password
    host='localhost',
    database='' #db name
)
cursor = conn.cursor()

with open('nim.sorted','r') as f:
    for line in f:
        data = [x.strip() for x in line.split(':')[0].split(',')] + [line.split(':')[1].strip()]
        print(data)
        if len(data) == 3:
            query = 'INSERT INTO nim (nim_tpb,nim_jurusan,name) VALUES (%s,%s,%s)'
        elif len(data) == 2:
            query = 'INSERT INTO nim (nim_tpb,name) VALUES (%s,%s)'
        cursor.execute(query, data)

conn.commit()
cursor.close()
conn.close()
